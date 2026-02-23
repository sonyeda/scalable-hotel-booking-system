import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import select, update

from database import get_db
from models import Booking, Room, Payment, User
from routers.auth import get_current_user

router = APIRouter(prefix="/api/bookings", tags=["Bookings"])


# Schemas
class BookingCreate(BaseModel):
    room_id: int
    check_in: str
    check_out: str
    nights: int
    guest_name: str
    payment_method: str = "card"


class BookingResponse(BaseModel):
    id: int
    room_id: int
    check_in: str
    check_out: str
    nights: int
    total_price: int
    guest_name: str
    status: str
    created_at: str | None = None

    class Config:
        from_attributes = True


# Routes
@router.post("/", response_model=BookingResponse)
def create_booking(
    data: BookingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Row-level locking to prevent double booking
    room = db.query(Room).filter(Room.id == data.room_id).with_for_update().first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    if room.available <= 0:
        raise HTTPException(status_code=400, detail="No rooms available")

    total_price = room.price * data.nights
    taxes = int(total_price * 0.18)
    grand_total = total_price + taxes

    # Decrease availability
    room.available -= 1

    booking = Booking(
        user_id=current_user.id,
        room_id=data.room_id,
        check_in=data.check_in,
        check_out=data.check_out,
        nights=data.nights,
        total_price=grand_total,
        guest_name=data.guest_name,
        status="Confirmed",
    )
    db.add(booking)
    db.flush()

    # Create payment record
    payment = Payment(
        booking_id=booking.id,
        amount=grand_total,
        method=data.payment_method,
        status="completed",
        transaction_id=f"TXN-{uuid.uuid4().hex[:12].upper()}",
    )
    db.add(payment)
    db.commit()
    db.refresh(booking)

    return booking


@router.get("/me", response_model=List[BookingResponse])
def get_my_bookings(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    bookings = db.query(Booking).filter(
        Booking.user_id == current_user.id
    ).order_by(Booking.created_at.desc()).all()
    return bookings


@router.delete("/{booking_id}", response_model=BookingResponse)
def cancel_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    booking = db.query(Booking).filter(
        Booking.id == booking_id,
        Booking.user_id == current_user.id,
    ).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    if booking.status == "Cancelled":
        raise HTTPException(status_code=400, detail="Booking already cancelled")

    booking.status = "Cancelled"

    # Restore room availability
    room = db.query(Room).filter(Room.id == booking.room_id).first()
    if room:
        room.available += 1

    # Mark payment as refunded
    payment = db.query(Payment).filter(Payment.booking_id == booking.id).first()
    if payment:
        payment.status = "refunded"

    db.commit()
    db.refresh(booking)
    return booking

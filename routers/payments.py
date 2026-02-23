from typing import List
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import get_db
from models import Payment, User
from routers.auth import get_current_user

router = APIRouter(prefix="/api/payments", tags=["Payments"])


class PaymentResponse(BaseModel):
    id: int
    booking_id: int
    amount: int
    method: str
    status: str
    transaction_id: str | None = None

    class Config:
        from_attributes = True


@router.get("/me", response_model=List[PaymentResponse])
def get_my_payments(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    from models import Booking
    payments = (
        db.query(Payment)
        .join(Booking, Payment.booking_id == Booking.id)
        .filter(Booking.user_id == current_user.id)
        .order_by(Payment.created_at.desc())
        .all()
    )
    return payments


@router.get("/{payment_id}", response_model=PaymentResponse)
def get_payment(
    payment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    from models import Booking
    payment = (
        db.query(Payment)
        .join(Booking, Payment.booking_id == Booking.id)
        .filter(Payment.id == payment_id, Booking.user_id == current_user.id)
        .first()
    )
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment

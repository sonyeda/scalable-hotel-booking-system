from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.orm import Session, joinedload

from database import get_db
from models import Hotel, Room, User
from routers.auth import get_current_user, get_admin_user

router = APIRouter(prefix="/api/hotels", tags=["Hotels"])


# Schemas
class RoomResponse(BaseModel):
    id: int
    type: str
    price: int
    available: int
    max_guests: int
    size: Optional[str] = None

    class Config:
        from_attributes = True


class HotelResponse(BaseModel):
    id: int
    name: str
    city: str
    address: Optional[str] = None
    description: Optional[str] = None
    rating: float
    review_count: int
    price_start: int
    image: Optional[str] = None
    images: list = []
    amenities: list = []
    rooms: List[RoomResponse] = []

    class Config:
        from_attributes = True


class HotelCreate(BaseModel):
    name: str
    city: str
    address: Optional[str] = ""
    description: Optional[str] = ""
    price_start: int = 5000
    image: Optional[str] = ""
    images: list = []
    amenities: list = []


class RoomCreate(BaseModel):
    type: str
    price: int
    available: int = 10
    max_guests: int = 2
    size: Optional[str] = "30 sqm"


# Routes
@router.get("/search", response_model=List[HotelResponse])
def search_hotels(
    city: Optional[str] = None,
    min_price: Optional[int] = None,
    max_price: Optional[int] = None,
    min_rating: Optional[float] = None,
    amenity: Optional[str] = None,
    sort_by: Optional[str] = "rating",
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    query = db.query(Hotel).options(joinedload(Hotel.rooms)).filter(Hotel.is_active == True)

    if city:
        query = query.filter(Hotel.city.ilike(f"%{city}%"))
    if min_price is not None:
        query = query.filter(Hotel.price_start >= min_price)
    if max_price is not None:
        query = query.filter(Hotel.price_start <= max_price)
    if min_rating is not None:
        query = query.filter(Hotel.rating >= min_rating)

    if sort_by == "price-low":
        query = query.order_by(Hotel.price_start.asc())
    elif sort_by == "price-high":
        query = query.order_by(Hotel.price_start.desc())
    else:
        query = query.order_by(Hotel.rating.desc())

    hotels = query.offset((page - 1) * page_size).limit(page_size).all()

    if amenity:
        hotels = [h for h in hotels if amenity in (h.amenities or [])]

    return hotels


@router.get("/{hotel_id}", response_model=HotelResponse)
def get_hotel(hotel_id: int, db: Session = Depends(get_db)):
    hotel = db.query(Hotel).options(joinedload(Hotel.rooms)).filter(Hotel.id == hotel_id).first()
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")
    return hotel


@router.post("/", response_model=HotelResponse)
def create_hotel(
    hotel_data: HotelCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user),
):
    hotel = Hotel(**hotel_data.model_dump())
    db.add(hotel)
    db.commit()
    db.refresh(hotel)
    return hotel


@router.put("/{hotel_id}", response_model=HotelResponse)
def update_hotel(
    hotel_id: int,
    hotel_data: HotelCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user),
):
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")
    for key, val in hotel_data.model_dump().items():
        setattr(hotel, key, val)
    db.commit()
    db.refresh(hotel)
    return hotel


@router.delete("/{hotel_id}")
def delete_hotel(
    hotel_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user),
):
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")
    db.delete(hotel)
    db.commit()
    return {"message": "Hotel deleted"}


@router.post("/{hotel_id}/rooms", response_model=RoomResponse)
def add_room(
    hotel_id: int,
    room_data: RoomCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_admin_user),
):
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")
    room = Room(hotel_id=hotel_id, **room_data.model_dump())
    db.add(room)
    db.commit()
    db.refresh(room)
    return room

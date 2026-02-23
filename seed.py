"""Seed the database with initial hotel data."""
from database import SessionLocal, engine, Base
from models import Hotel, Room, User
from routers.auth import get_password_hash

Base.metadata.create_all(bind=engine)
db = SessionLocal()

# Check if already seeded
if db.query(Hotel).count() > 0:
    print("Database already seeded.")
    db.close()
    exit()

# Create admin user
admin = User(
    name="Admin",
    email="admin@luxestay.com",
    hashed_password=get_password_hash("admin123"),
    is_admin=True,
)
db.add(admin)

# Create demo user
demo = User(
    name="Demo User",
    email="demo@luxestay.com",
    hashed_password=get_password_hash("demo123"),
    is_admin=False,
)
db.add(demo)

# Hotels and rooms
hotels_data = [
    {
        "name": "The Grand Meridian",
        "city": "Mumbai",
        "address": "Marine Drive, Mumbai, Maharashtra 400020",
        "description": "Experience unparalleled luxury at The Grand Meridian, perched along Mumbai's iconic Marine Drive.",
        "rating": 4.8, "review_count": 1247, "price_start": 8500,
        "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
            "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
        ],
        "amenities": ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Parking", "Room Service"],
        "rooms": [
            {"type": "Deluxe Room", "price": 8500, "available": 5, "max_guests": 2, "size": "35 sqm"},
            {"type": "Premium Suite", "price": 14000, "available": 3, "max_guests": 3, "size": "55 sqm"},
            {"type": "Royal Suite", "price": 25000, "available": 1, "max_guests": 4, "size": "85 sqm"},
        ],
    },
    {
        "name": "Taj Lakefront",
        "city": "Udaipur",
        "address": "Lake Pichola, Udaipur, Rajasthan 313001",
        "description": "Set against the stunning backdrop of Lake Pichola, blending royal Rajasthani architecture with modern luxury.",
        "rating": 4.9, "review_count": 983, "price_start": 12000,
        "image": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
            "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
        ],
        "amenities": ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Lake View", "Heritage Walk"],
        "rooms": [
            {"type": "Lake View Room", "price": 12000, "available": 4, "max_guests": 2, "size": "40 sqm"},
            {"type": "Heritage Suite", "price": 20000, "available": 2, "max_guests": 3, "size": "65 sqm"},
            {"type": "Maharaja Suite", "price": 35000, "available": 1, "max_guests": 4, "size": "120 sqm"},
        ],
    },
    {
        "name": "Skyline Heights",
        "city": "Bangalore",
        "address": "MG Road, Bangalore, Karnataka 560001",
        "description": "A contemporary urban retreat in the heart of India's tech capital with a rooftop infinity pool.",
        "rating": 4.5, "review_count": 756, "price_start": 6500,
        "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
            "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
        ],
        "amenities": ["WiFi", "Pool", "Gym", "Restaurant", "Bar", "Business Center", "Parking"],
        "rooms": [
            {"type": "Standard Room", "price": 6500, "available": 8, "max_guests": 2, "size": "28 sqm"},
            {"type": "Executive Room", "price": 9500, "available": 4, "max_guests": 2, "size": "38 sqm"},
            {"type": "Penthouse Suite", "price": 18000, "available": 2, "max_guests": 4, "size": "75 sqm"},
        ],
    },
    {
        "name": "Coastal Breeze Resort",
        "city": "Goa",
        "address": "Calangute Beach Road, Goa 403516",
        "description": "Beachfront paradise with private beach access, water sports, and the freshest seafood.",
        "rating": 4.6, "review_count": 1102, "price_start": 7000,
        "image": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
            "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=800&q=80",
        ],
        "amenities": ["WiFi", "Beach Access", "Pool", "Spa", "Restaurant", "Bar", "Water Sports", "Yoga"],
        "rooms": [
            {"type": "Garden View Room", "price": 7000, "available": 6, "max_guests": 2, "size": "30 sqm"},
            {"type": "Sea View Suite", "price": 12500, "available": 3, "max_guests": 3, "size": "50 sqm"},
            {"type": "Beach Villa", "price": 22000, "available": 2, "max_guests": 4, "size": "90 sqm"},
        ],
    },
    {
        "name": "Himalayan Retreat",
        "city": "Shimla",
        "address": "Mall Road, Shimla, Himachal Pradesh 171001",
        "description": "Nestled in the misty Himalayas, offering panoramic mountain views and cozy fireplaces.",
        "rating": 4.7, "review_count": 621, "price_start": 5500,
        "image": "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
            "https://images.unsplash.com/photo-1586611292717-f828b167408c?w=800&q=80",
        ],
        "amenities": ["WiFi", "Fireplace", "Spa", "Restaurant", "Mountain View", "Trekking", "Library"],
        "rooms": [
            {"type": "Mountain View Room", "price": 5500, "available": 5, "max_guests": 2, "size": "32 sqm"},
            {"type": "Deluxe Cottage", "price": 9000, "available": 3, "max_guests": 3, "size": "48 sqm"},
            {"type": "Presidential Suite", "price": 16000, "available": 1, "max_guests": 4, "size": "70 sqm"},
        ],
    },
    {
        "name": "Royal Orchid Palace",
        "city": "Delhi",
        "address": "Connaught Place, New Delhi 110001",
        "description": "Mughal-inspired grandeur with contemporary comfort, steps from historical monuments.",
        "rating": 4.4, "review_count": 892, "price_start": 7500,
        "image": "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
        "images": [
            "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
        ],
        "amenities": ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Parking", "Concierge"],
        "rooms": [
            {"type": "Classic Room", "price": 7500, "available": 10, "max_guests": 2, "size": "30 sqm"},
            {"type": "Mughal Suite", "price": 15000, "available": 3, "max_guests": 3, "size": "55 sqm"},
            {"type": "Imperial Suite", "price": 28000, "available": 1, "max_guests": 4, "size": "100 sqm"},
        ],
    },
]

for h_data in hotels_data:
    rooms_data = h_data.pop("rooms")
    hotel = Hotel(**h_data)
    db.add(hotel)
    db.flush()
    for r in rooms_data:
        room = Room(hotel_id=hotel.id, **r)
        db.add(room)

db.commit()
db.close()
print("✅ Database seeded with 6 hotels, 18 rooms, and 2 users!")
print("   Admin: admin@luxestay.com / admin123")
print("   Demo:  demo@luxestay.com / demo123")

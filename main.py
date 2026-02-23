from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import auth, hotels, bookings, payments

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="LuxeStay API",
    description="Scalable Hotel Booking System API",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(hotels.router)
app.include_router(bookings.router)
app.include_router(payments.router)


@app.get("/")
def root():
    return {"message": "LuxeStay API v1.0", "docs": "/docs"}


@app.get("/api/health")
def health():
    return {"status": "healthy"}

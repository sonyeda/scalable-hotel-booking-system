// Mock data for the hotel booking system
// This replaces API calls until the backend is connected

export const MOCK_HOTELS = [
    {
        id: 1,
        name: "The Grand Meridian",
        city: "Mumbai",
        address: "Marine Drive, Mumbai, Maharashtra 400020",
        description: "Experience unparalleled luxury at The Grand Meridian, perched along Mumbai's iconic Marine Drive. Floor-to-ceiling windows offer breathtaking views of the Arabian Sea, while our world-class amenities ensure an unforgettable stay.",
        rating: 4.8,
        reviewCount: 1247,
        priceStart: 8500,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
            "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80"
        ],
        amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Parking", "Room Service"],
        rooms: [
            { id: 101, type: "Deluxe Room", price: 8500, available: 5, maxGuests: 2, size: "35 sqm" },
            { id: 102, type: "Premium Suite", price: 14000, available: 3, maxGuests: 3, size: "55 sqm" },
            { id: 103, type: "Royal Suite", price: 25000, available: 1, maxGuests: 4, size: "85 sqm" }
        ]
    },
    {
        id: 2,
        name: "Taj Lakefront",
        city: "Udaipur",
        address: "Lake Pichola, Udaipur, Rajasthan 313001",
        description: "Set against the stunning backdrop of Lake Pichola, Taj Lakefront is a heritage property that blends royal Rajasthani architecture with modern luxury. Enjoy sunset boat rides and authentic Rajasthani cuisine.",
        rating: 4.9,
        reviewCount: 983,
        priceStart: 12000,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
            "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
        ],
        amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Lake View", "Heritage Walk"],
        rooms: [
            { id: 201, type: "Lake View Room", price: 12000, available: 4, maxGuests: 2, size: "40 sqm" },
            { id: 202, type: "Heritage Suite", price: 20000, available: 2, maxGuests: 3, size: "65 sqm" },
            { id: 203, type: "Maharaja Suite", price: 35000, available: 1, maxGuests: 4, size: "120 sqm" }
        ]
    },
    {
        id: 3,
        name: "Skyline Heights",
        city: "Bangalore",
        address: "MG Road, Bangalore, Karnataka 560001",
        description: "A contemporary urban retreat in the heart of India's tech capital. Skyline Heights offers sleek minimalist rooms, a rooftop infinity pool, and proximity to Bangalore's vibrant nightlife and business district.",
        rating: 4.5,
        reviewCount: 756,
        priceStart: 6500,
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
            "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
            "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80"
        ],
        amenities: ["WiFi", "Pool", "Gym", "Restaurant", "Bar", "Business Center", "Parking"],
        rooms: [
            { id: 301, type: "Standard Room", price: 6500, available: 8, maxGuests: 2, size: "28 sqm" },
            { id: 302, type: "Executive Room", price: 9500, available: 4, maxGuests: 2, size: "38 sqm" },
            { id: 303, type: "Penthouse Suite", price: 18000, available: 2, maxGuests: 4, size: "75 sqm" }
        ]
    },
    {
        id: 4,
        name: "Coastal Breeze Resort",
        city: "Goa",
        address: "Calangute Beach Road, Goa 403516",
        description: "Wake up to the sound of waves at Coastal Breeze Resort. This beachfront paradise features private beach access, water sports, an Ayurvedic spa, and the freshest seafood you'll ever taste.",
        rating: 4.6,
        reviewCount: 1102,
        priceStart: 7000,
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
            "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=800&q=80",
            "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
            "https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?w=800&q=80"
        ],
        amenities: ["WiFi", "Beach Access", "Pool", "Spa", "Restaurant", "Bar", "Water Sports", "Yoga"],
        rooms: [
            { id: 401, type: "Garden View Room", price: 7000, available: 6, maxGuests: 2, size: "30 sqm" },
            { id: 402, type: "Sea View Suite", price: 12500, available: 3, maxGuests: 3, size: "50 sqm" },
            { id: 403, type: "Beach Villa", price: 22000, available: 2, maxGuests: 4, size: "90 sqm" }
        ]
    },
    {
        id: 5,
        name: "Himalayan Retreat",
        city: "Shimla",
        address: "Mall Road, Shimla, Himachal Pradesh 171001",
        description: "Nestled in the misty Himalayas, this boutique retreat offers panoramic mountain views, cozy fireplaces, and the tranquility of nature. Perfect for a rejuvenating escape from city life.",
        rating: 4.7,
        reviewCount: 621,
        priceStart: 5500,
        image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
            "https://images.unsplash.com/photo-1586611292717-f828b167408c?w=800&q=80",
            "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
        ],
        amenities: ["WiFi", "Fireplace", "Spa", "Restaurant", "Mountain View", "Trekking", "Library"],
        rooms: [
            { id: 501, type: "Mountain View Room", price: 5500, available: 5, maxGuests: 2, size: "32 sqm" },
            { id: 502, type: "Deluxe Cottage", price: 9000, available: 3, maxGuests: 3, size: "48 sqm" },
            { id: 503, type: "Presidential Suite", price: 16000, available: 1, maxGuests: 4, size: "70 sqm" }
        ]
    },
    {
        id: 6,
        name: "Royal Orchid Palace",
        city: "Delhi",
        address: "Connaught Place, New Delhi 110001",
        description: "Situated in the heart of India's capital, Royal Orchid Palace combines Mughal-inspired grandeur with contemporary comfort. Steps away from historical monuments and the best shopping districts.",
        rating: 4.4,
        reviewCount: 892,
        priceStart: 7500,
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"
        ],
        amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Bar", "Parking", "Concierge"],
        rooms: [
            { id: 601, type: "Classic Room", price: 7500, available: 10, maxGuests: 2, size: "30 sqm" },
            { id: 602, type: "Mughal Suite", price: 15000, available: 3, maxGuests: 3, size: "55 sqm" },
            { id: 603, type: "Imperial Suite", price: 28000, available: 1, maxGuests: 4, size: "100 sqm" }
        ]
    }
];

export const POPULAR_DESTINATIONS = [
    { city: "Goa", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80", priceFrom: 7000, hotels: 45 },
    { city: "Udaipur", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80", priceFrom: 12000, hotels: 28 },
    { city: "Mumbai", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80", priceFrom: 8500, hotels: 67 },
    { city: "Shimla", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80", priceFrom: 5500, hotels: 32 },
    { city: "Delhi", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80", priceFrom: 7500, hotels: 89 },
    { city: "Bangalore", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&q=80", priceFrom: 6500, hotels: 54 }
];

export const AMENITY_ICONS = {
    "WiFi": "📶",
    "Pool": "🏊",
    "Spa": "💆",
    "Gym": "🏋️",
    "Restaurant": "🍽️",
    "Bar": "🍸",
    "Parking": "🅿️",
    "Room Service": "🛎️",
    "Lake View": "🌊",
    "Heritage Walk": "🏛️",
    "Business Center": "💼",
    "Beach Access": "🏖️",
    "Water Sports": "🏄",
    "Yoga": "🧘",
    "Fireplace": "🔥",
    "Mountain View": "🏔️",
    "Trekking": "🥾",
    "Library": "📚",
    "Concierge": "🎩",
    "AC": "❄️"
};

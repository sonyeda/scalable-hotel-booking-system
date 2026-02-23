import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import HotelCard from '../components/HotelCard';
import { MOCK_HOTELS } from '../data/mockData';

export default function SearchResultsPage() {
    const [searchParams] = useSearchParams();
    const cityFilter = searchParams.get('city') || '';
    const [priceRange, setPriceRange] = useState([0, 40000]);
    const [ratingFilter, setRatingFilter] = useState(0);
    const [amenityFilter, setAmenityFilter] = useState([]);
    const [sortBy, setSortBy] = useState('rating');

    const allAmenities = useMemo(() => {
        const set = new Set();
        MOCK_HOTELS.forEach(h => h.amenities.forEach(a => set.add(a)));
        return Array.from(set);
    }, []);

    const filteredHotels = useMemo(() => {
        let result = [...MOCK_HOTELS];

        if (cityFilter) {
            result = result.filter(h =>
                h.city.toLowerCase().includes(cityFilter.toLowerCase())
            );
        }
        result = result.filter(h => h.priceStart >= priceRange[0] && h.priceStart <= priceRange[1]);
        if (ratingFilter > 0) {
            result = result.filter(h => h.rating >= ratingFilter);
        }
        if (amenityFilter.length > 0) {
            result = result.filter(h => amenityFilter.every(a => h.amenities.includes(a)));
        }

        if (sortBy === 'price-low') result.sort((a, b) => a.priceStart - b.priceStart);
        else if (sortBy === 'price-high') result.sort((a, b) => b.priceStart - a.priceStart);
        else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

        return result;
    }, [cityFilter, priceRange, ratingFilter, amenityFilter, sortBy]);

    const toggleAmenity = (a) => {
        setAmenityFilter(prev =>
            prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]
        );
    };

    return (
        <div style={{ paddingTop: '5rem', minHeight: '100vh', background: 'var(--color-slate-50)' }}>
            {/* Search Bar */}
            <div className="page-container" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                <SearchBar variant="inline" initialValues={{ city: cityFilter }} />
            </div>

            <div className="page-container" style={{
                display: 'grid',
                gridTemplateColumns: '280px 1fr',
                gap: '2rem',
                paddingBottom: '3rem',
            }}>
                {/* Sidebar Filters */}
                <motion.aside
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{
                        background: 'white', borderRadius: 16,
                        padding: '1.5rem', boxShadow: 'var(--shadow-card)',
                        height: 'fit-content', position: 'sticky', top: '5.5rem',
                    }}
                >
                    <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem', color: 'var(--color-navy-900)' }}>
                        🎛️ Filters
                    </h3>

                    {/* Price Range */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-slate-700)', display: 'block', marginBottom: '0.5rem' }}>
                            Price Range
                        </label>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-slate-500)', marginBottom: '0.5rem' }}>
                            ₹{priceRange[0].toLocaleString()} — ₹{priceRange[1].toLocaleString()}
                        </div>
                        <input
                            type="range"
                            min={0} max={40000} step={500}
                            value={priceRange[1]}
                            onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            style={{ width: '100%', accentColor: '#14b8a6' }}
                        />
                    </div>

                    {/* Rating */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-slate-700)', display: 'block', marginBottom: '0.5rem' }}>
                            Minimum Rating
                        </label>
                        <div style={{ display: 'flex', gap: '0.375rem' }}>
                            {[0, 4, 4.5, 4.7].map(r => (
                                <button
                                    key={r}
                                    onClick={() => setRatingFilter(r)}
                                    style={{
                                        padding: '0.4rem 0.75rem', borderRadius: 8,
                                        border: ratingFilter === r ? '2px solid #14b8a6' : '2px solid var(--color-slate-200)',
                                        background: ratingFilter === r ? 'rgba(20,184,166,0.1)' : 'white',
                                        color: ratingFilter === r ? '#14b8a6' : 'var(--color-slate-600)',
                                        fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                                        fontFamily: 'var(--font-body)',
                                    }}
                                >
                                    {r === 0 ? 'All' : `${r}+`}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Amenities */}
                    <div>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-slate-700)', display: 'block', marginBottom: '0.5rem' }}>
                            Amenities
                        </label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                            {allAmenities.map(a => (
                                <button
                                    key={a}
                                    onClick={() => toggleAmenity(a)}
                                    style={{
                                        padding: '0.35rem 0.7rem', borderRadius: 8,
                                        border: amenityFilter.includes(a) ? '2px solid #14b8a6' : '2px solid var(--color-slate-200)',
                                        background: amenityFilter.includes(a) ? 'rgba(20,184,166,0.1)' : 'white',
                                        color: amenityFilter.includes(a) ? '#14b8a6' : 'var(--color-slate-600)',
                                        fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer',
                                        fontFamily: 'var(--font-body)',
                                    }}
                                >
                                    {a}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.aside>

                {/* Results */}
                <div>
                    {/* Sort & Count */}
                    <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        marginBottom: '1.5rem',
                    }}>
                        <div>
                            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-navy-900)' }}>
                                {filteredHotels.length} {filteredHotels.length === 1 ? 'hotel' : 'hotels'} found
                            </span>
                            {cityFilter && (
                                <span style={{ color: 'var(--color-slate-400)', marginLeft: '0.5rem' }}>
                                    in {cityFilter}
                                </span>
                            )}
                        </div>
                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            style={{
                                padding: '0.5rem 1rem', borderRadius: 10,
                                border: '2px solid var(--color-slate-200)',
                                fontSize: '0.85rem', fontFamily: 'var(--font-body)',
                                color: 'var(--color-slate-700)', cursor: 'pointer',
                                background: 'white',
                            }}
                        >
                            <option value="rating">Top Rated</option>
                            <option value="price-low">Price: Low → High</option>
                            <option value="price-high">Price: High → Low</option>
                        </select>
                    </div>

                    {/* Hotel Grid */}
                    {filteredHotels.length > 0 ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: '1.5rem',
                        }}>
                            {filteredHotels.map((hotel, i) => (
                                <HotelCard key={hotel.id} hotel={hotel} index={i} />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{
                                textAlign: 'center', padding: '4rem 2rem',
                                background: 'white', borderRadius: 16,
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                            <h3 style={{ color: 'var(--color-slate-700)', marginBottom: '0.5rem' }}>No hotels found</h3>
                            <p style={{ color: 'var(--color-slate-400)' }}>Try adjusting your filters or search criteria</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

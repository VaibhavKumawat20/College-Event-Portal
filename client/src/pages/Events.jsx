import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Search, Users } from 'lucide-react';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await api.get('/events');
                setEvents(res.data);
            } catch (err) {
                console.error("Failed to fetch events", err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isRegistrationClosed = (deadline) => new Date(deadline) < new Date();

    if (loading) return <div className="text-center text-white mt-20">Loading events...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <h1 className="text-3xl font-bold text-white">Upcoming Events</h1>
                <div className="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Search events..."
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
                </div>
            </div>

            {/* Event Grid */}
            {filteredEvents.length === 0 ? (
                <div className="text-center text-slate-400 py-20 bg-slate-800//50 rounded-2xl">
                    No events found matching your search.
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredEvents.map(event => (
                        <div key={event._id} className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500 transition-all shadow-lg flex flex-col">
                            {/* Image Section */}
                            <div className="h-48 relative overflow-hidden">
                                {event.bannerUrl ? (
                                    <img src={event.bannerUrl} alt={event.title} className="w-full h-full object-cover transition-transform hover:scale-110 duration-500" />
                                ) : (
                                    <div className="w-full h-full bg-slate-700 flex items-center justify-center text-slate-500">No Image</div>
                                )}
                                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10 uppercase">
                                    {isRegistrationClosed(event.registrationDeadline) ?
                                        <span className="text-red-400">Closed</span> :
                                        <span className="text-green-400">Open</span>
                                    }
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 flex-grow flex flex-col">
                                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                                <p className="text-slate-400 text-sm line-clamp-2 mb-4 flex-grow">{event.description}</p>

                                <div className="space-y-2 text-sm text-slate-300 mb-6">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-blue-500" />
                                        <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-blue-500" />
                                        <span>{event.venue}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users size={16} className="text-blue-500" />
                                        <span>{event.registeredCount || 0} Registered</span>
                                    </div>
                                </div>

                                <Link
                                    to={`/events/${event._id}`}
                                    className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-auto"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Events;

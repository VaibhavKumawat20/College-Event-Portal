import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Calendar, MapPin, Clock, Users, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                // Fetch event details
                const res = await api.get(`/events/${id}`);
                setEvent(res.data);

                // Check registration status if user is logged in
                if (user) {
                    try {
                        const regRes = await api.get('/events/my-registrations');
                        const registered = regRes.data.some(reg => reg.event._id === id);
                        setIsRegistered(registered);
                    } catch (ignore) { /* If this fails, just assume not registered */ }
                }

            } catch (err) {
                console.error("Failed to fetch event details", err);
                setError("Event not found or server error.");
            } finally {
                setLoading(false);
            }
        };
        fetchEventDetails();
    }, [id, user]);

    const handleRegister = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setRegistering(true);
        try {
            await api.post(`/events/${id}/register`);
            setIsRegistered(true);
            // Update local count optimistically
            setEvent(prev => ({ ...prev, registeredCount: (prev.registeredCount || 0) + 1 }));
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setRegistering(false);
        }
    };

    if (loading) return <div className="text-center text-white mt-20">Loading details...</div>;
    if (error) return <div className="text-center text-red-500 mt-20">{error}</div>;
    if (!event) return null;

    const isClosed = new Date(event.registrationDeadline) < new Date();

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-white flex items-center gap-2 mb-6 transition-colors">
                <ArrowLeft size={20} /> Back
            </button>

            <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                {/* Banner */}
                <div className="h-64 md:h-96 relative">
                    {event.bannerUrl ? (
                        <img src={event.bannerUrl} alt={event.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-slate-700 flex items-center justify-center text-slate-500 text-xl">No Banner Image</div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-8 pt-20">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{event.title}</h1>
                        <span className={`inline-block px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${isClosed ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                            {isClosed ? 'Registration Closed' : 'Registration Open'}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row">
                    {/* Main Content */}
                    <div className="p-8 md:w-2/3 space-y-8">
                        <div>
                            <h2 className="text-xl font-bold text-white mb-4">About the Event</h2>
                            <p className="text-slate-300 leading-relaxed text-lg">{event.description}</p>
                        </div>
                    </div>

                    {/* Sidebar / Info Panel */}
                    <div className="bg-slate-900/50 p-8 md:w-1/3 border-l border-slate-700 space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Calendar className="text-blue-500 mt-1" size={24} />
                                <div>
                                    <h4 className="text-sm text-slate-400 font-bold uppercase">Date</h4>
                                    <p className="text-white text-lg font-medium">{new Date(event.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock className="text-blue-500 mt-1" size={24} />
                                <div>
                                    <h4 className="text-sm text-slate-400 font-bold uppercase">Time</h4>
                                    <p className="text-white text-lg font-medium">{event.time}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="text-blue-500 mt-1" size={24} />
                                <div>
                                    <h4 className="text-sm text-slate-400 font-bold uppercase">Venue</h4>
                                    <p className="text-white text-lg font-medium">{event.venue}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Users className="text-blue-500 mt-1" size={24} />
                                <div>
                                    <h4 className="text-sm text-slate-400 font-bold uppercase">Total Registrations</h4>
                                    <p className="text-white text-lg font-medium">{event.registeredCount || 0}</p>
                                </div>
                            </div>
                        </div>

                        <hr className="border-slate-700" />

                        <div>
                            <h4 className="text-sm text-slate-400 font-bold uppercase mb-1">Registration Deadline</h4>
                            <p className="text-red-400 font-medium">{new Date(event.registrationDeadline).toLocaleDateString()}</p>
                        </div>

                        <button
                            onClick={handleRegister}
                            disabled={isRegistered || isClosed || registering}
                            className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform active:scale-95 shadow-lg ${isRegistered
                                    ? 'bg-green-600 text-white cursor-default'
                                    : isClosed
                                        ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-500/20'
                                }`}
                        >
                            {registering ? 'Processing...' : isRegistered ? 'Already Registered' : isClosed ? 'Deadline Passed' : 'Register Now'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;

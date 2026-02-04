import { Link } from 'react-router-dom';
import { Calendar, Award, Bell, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../api/axios';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventsRes = await api.get('/events'); // TODO: Limit to upcoming/3
                setEvents(eventsRes.data.slice(0, 3));
                const achievementsRes = await api.get('/achievements');
                setAchievements(achievementsRes.data.slice(0, 3));
            } catch (err) {
                console.error("Failed to fetch data", err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="bg-slate-900 min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-900 pt-20 pb-32">
                <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-gradient-to-br from-blue-900 to-slate-900 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-6">
                        Smart College <br /> Event Automation Platform
                    </h1>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                        Streamline campus life with centralized notices, event management, and instant updates.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:-translate-y-1 shadow-lg shadow-blue-500/30">
                            Student Login
                        </Link>
                        <Link to="/login" className="bg-slate-800 hover:bg-slate-700 text-gray-200 font-bold py-3 px-8 rounded-full transition-transform transform hover:-translate-y-1 border border-slate-700">
                            Admin Login
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Bell className="w-10 h-10 text-blue-400" />}
                            title="Centralized Notices"
                            desc="Never miss an update. Get instant notifications for important college announcements."
                        />
                        <FeatureCard
                            icon={<Calendar className="w-10 h-10 text-cyan-400" />}
                            title="Event Management"
                            desc="Register for events, workshops, and seminars with a single click. Track countdowns."
                        />
                        <FeatureCard
                            icon={<Award className="w-10 h-10 text-yellow-400" />}
                            title="Achievements"
                            desc="Showcase your wins. A dedicated gallery for student and college accomplishments."
                        />
                    </div>
                </div>
            </section>

            {/* Upcoming Events Preview */}
            <section className="py-20 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Upcoming Events</h2>
                            <div className="h-1 w-20 bg-blue-500 rounded"></div>
                        </div>
                        <Link to="/events" className="text-blue-400 hover:text-blue-300 flex items-center">View All <ArrowRight className="ml-2 w-4 h-4" /></Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {events.map(event => (
                            <div key={event._id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:shadow-blue-500/10 hover:shadow-lg transition-all">
                                <div className="h-48 bg-slate-700 relative">
                                    {/* Placeholder for Banner */}
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-500">No Image</div>
                                    {event.bannerUrl && <img src={event.bannerUrl} alt={event.title} className="w-full h-full object-cover" />}
                                    <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        {new Date(event.date).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{event.description}</p>
                                    <div className="flex justify-between items-center text-sm text-slate-500">
                                        <span>{event.venue}</span>
                                        <span>{event.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {events.length === 0 && <p className="text-slate-500">No upcoming events found.</p>}
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors">
        <div className="bg-slate-900 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed">
            {desc}
        </p>
    </div>
);

export default Home;

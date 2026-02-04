import { useEffect, useState } from 'react';
import { Calendar, ClipboardList } from 'lucide-react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';

const StudentOverview = () => {
    const [registrations, setRegistrations] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const regRes = await api.get('/events/my-registrations');
                setRegistrations(regRes.data);
                const eventRes = await api.get('/events');
                setUpcomingEvents(eventRes.data.slice(0, 3));
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="p-6 md:p-8 space-y-8">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Stats */}
                <div className="flex-1 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg">
                    <h3 className="text-lg font-semibold opacity-80">My Registrations</h3>
                    <div className="mt-4 flex items-end justify-between">
                        <span className="text-4xl font-bold">{registrations.length}</span>
                        <ClipboardList size={32} className="opacity-50" />
                    </div>
                </div>
                <div className="flex-1 bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-lg">
                    <h3 className="text-lg font-semibold text-white">Upcoming Events</h3>
                    <div className="mt-4 flex items-end justify-between">
                        <span className="text-4xl font-bold text-white">{upcomingEvents.length}</span>
                        <Calendar size={32} className="text-slate-500" />
                    </div>
                </div>
            </div>

            {/* Recent Registrations Table/List */}
            <div>
                <h2 className="text-xl font-bold text-white mb-4">My Status</h2>
                <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                    {registrations.length === 0 ? (
                        <div className="p-8 text-center text-slate-400">
                            You haven't registered for any events yet.
                            <Link to="/events" className="text-blue-400 ml-2 hover:underline">Browse Events</Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-400">
                                <thead className="bg-slate-900 uppercase font-medium">
                                    <tr>
                                        <th className="px-6 py-4">Event</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Venue</th>
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700">
                                    {registrations.slice(0, 5).map(reg => (
                                        <tr key={reg._id} className="hover:bg-slate-750">
                                            <td className="px-6 py-4 font-medium text-white">{reg.event?.title}</td>
                                            <td className="px-6 py-4">{reg.event?.date ? new Date(reg.event.date).toLocaleDateString() : 'N/A'}</td>
                                            <td className="px-6 py-4">{reg.event?.venue}</td>
                                            <td className="px-6 py-4">
                                                <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase">
                                                    {reg.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Recommended Events */}
            <div>
                <h2 className="text-xl font-bold text-white mb-4">Recommended for You</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {upcomingEvents.map(event => (
                        <div key={event._id} className="bg-slate-800 rounded-xl border border-slate-700 p-5 hover:border-blue-500 transition-colors">
                            <div className="mb-4 h-32 bg-slate-700 rounded-lg overflow-hidden">
                                {event.bannerUrl ? <img src={event.bannerUrl} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-500">No Image</div>}
                            </div>
                            <h4 className="font-bold text-white mb-2 truncate">{event.title}</h4>
                            <p className="text-xs text-slate-400 mb-4">{new Date(event.date).toLocaleDateString()} • {event.venue}</p>
                            <Link to="/events" className="block w-full text-center bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg text-sm transition-colors">Details</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentOverview;

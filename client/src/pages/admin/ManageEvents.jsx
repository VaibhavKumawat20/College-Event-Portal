import { useEffect, useState } from 'react';
import { Plus, Trash2, Calendar, MapPin, Clock } from 'lucide-react';
import api from '../../api/axios';

const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '', description: '', date: '', time: '', venue: '', registrationDeadline: ''
    });

    const fetchEvents = async () => {
        try {
            const res = await api.get('/events');
            setEvents(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async (id) => {
        if (confirm('Are you sure? This will delete all registrations for this event.')) {
            try {
                await api.delete(`/events/${id}`);
                setEvents(events.filter(e => e._id !== id));
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/events', formData);
            setIsModalOpen(false);
            setFormData({ title: '', description: '', date: '', time: '', venue: '', registrationDeadline: '' });
            fetchEvents();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Manage Events</h2>
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <Plus size={18} />
                    <span>Create Event</span>
                </button>
            </div>

            <div className="grid gap-4">
                {events.map(event => (
                    <div key={event._id} className="bg-slate-800 p-6 rounded-lg border border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                            <p className="text-slate-400 text-sm mb-3 line-clamp-2">{event.description}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                <span className="flex items-center space-x-1"><Calendar size={14} /> <span>{new Date(event.date).toLocaleDateString()}</span></span>
                                <span className="flex items-center space-x-1"><Clock size={14} /> <span>{event.time}</span></span>
                                <span className="flex items-center space-x-1"><MapPin size={14} /> <span>{event.venue}</span></span>
                                <span className="text-blue-400">Reg Count: {event.registeredCount || 0}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs bg-slate-900 px-2 py-1 rounded text-slate-400 border border-slate-700">Deadline: {new Date(event.registrationDeadline).toLocaleDateString()}</span>
                            <button onClick={() => handleDelete(event._id)} className="text-red-400 hover:text-red-300 p-2 bg-slate-900 rounded-full hover:bg-slate-700 transition-colors">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-800 rounded-xl p-6 w-full max-w-lg border border-slate-700 max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold text-white mb-4">Create New Event</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text" placeholder="Event Title" required
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                                value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                            <textarea
                                placeholder="Description" required
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white h-20"
                                value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-slate-400">Date</label>
                                    <input type="date" required className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-sm text-slate-400">Time</label>
                                    <input type="time" required className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm text-slate-400">Venue</label>
                                <input type="text" placeholder="Venue" required className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white" value={formData.venue} onChange={e => setFormData({ ...formData, venue: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-sm text-slate-400">Registration Deadline</label>
                                <input type="date" required className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white" value={formData.registrationDeadline} onChange={e => setFormData({ ...formData, registrationDeadline: e.target.value })} />
                            </div>

                            <div className="flex justify-end space-x-2 mt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create Event</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageEvents;

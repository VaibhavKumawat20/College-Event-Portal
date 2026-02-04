import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Calendar, MapPin, Clock } from 'lucide-react';

const MyRegistrations = () => {
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        const fetchRegistrations = async () => {
            try {
                const res = await api.get('/events/my-registrations');
                setRegistrations(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchRegistrations();
    }, []);

    return (
        <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-6">My Registrations</h2>
            <div className="grid gap-4">
                {registrations.map(reg => (
                    <div key={reg._id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">{reg.event?.title}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                                <span className="flex items-center space-x-1"><Calendar size={16} /> <span>{new Date(reg.event?.date).toLocaleDateString()}</span></span>
                                <span className="flex items-center space-x-1"><Clock size={16} /> <span>{reg.event?.time}</span></span>
                                <span className="flex items-center space-x-1"><MapPin size={16} /> <span>{reg.event?.venue}</span></span>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center space-x-4">
                            <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase ${reg.status === 'registered' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                                }`}>
                                {reg.status}
                            </span>
                            {/* Cancel Button Placeholder */}
                            {reg.status === 'registered' && (
                                <button className="text-red-400 hover:text-red-300 text-sm font-medium">Cancel</button>
                            )}
                        </div>
                    </div>
                ))}
                {registrations.length === 0 && <p className="text-slate-400">No registrations found.</p>}
            </div>
        </div>
    );
};

export default MyRegistrations;

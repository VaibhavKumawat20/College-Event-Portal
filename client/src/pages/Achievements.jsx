import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Trophy, Calendar } from 'lucide-react';

const Achievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const res = await api.get('/achievements');
                setAchievements(res.data);
            } catch (err) {
                console.error("Failed to fetch achievements", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAchievements();
    }, []);

    if (loading) return <div className="text-center text-white mt-20">Loading achievements...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold text-white mb-10 text-center">Hall of Fame</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {achievements.map(ach => (
                    <div key={ach._id} className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-lg hover:-translate-y-1 transition-transform duration-300">
                        <div className="h-56 relative">
                            {ach.mediaUrl ? (
                                <img src={ach.mediaUrl} alt={ach.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-slate-700 flex items-center justify-center text-slate-500">No Image</div>
                            )}
                            <div className="absolute top-4 right-4 bg-yellow-500/90 text-slate-900 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1 shadow-lg">
                                <Trophy size={14} /> Winner
                            </div>
                        </div>
                        <div className="p-6">
                            <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2 block">{ach.category || 'Achievement'}</span>
                            <h3 className="text-xl font-bold text-white mb-3">{ach.title}</h3>
                            <p className="text-slate-400 text-sm mb-4 leading-relaxed">{ach.description}</p>
                            <div className="flex items-center text-slate-500 text-xs font-medium">
                                <Calendar size={14} className="mr-1" />
                                {new Date(ach.date).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Achievements;

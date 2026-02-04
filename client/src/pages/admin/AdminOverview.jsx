import { useEffect, useState } from 'react';
import { Users, Calendar, Bell, Trophy } from 'lucide-react';
import api from '../../api/axios';

const AdminOverview = () => {
    const [stats, setStats] = useState({
        events: 0,
        notices: 0,
        achievements: 0,
    });
    // In a real app we'd fetch counts from an endpoint like /admin/stats
    // For now we'll just fetch lists and count them or mock it.

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [eventsRes, noticesRes, achievementsRes] = await Promise.all([
                    api.get('/events'),
                    api.get('/notices'),
                    api.get('/achievements')
                ]);
                setStats({
                    events: eventsRes.data.length,
                    notices: noticesRes.data.length,
                    achievements: achievementsRes.data.length
                });
            } catch (e) {
                console.error("Failed to fetch stats");
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Events"
                    value={stats.events}
                    icon={<Calendar className="text-blue-500" size={24} />}
                    color="border-blue-500/20"
                />
                <StatsCard
                    title="Active Notices"
                    value={stats.notices}
                    icon={<Bell className="text-cyan-500" size={24} />}
                    color="border-cyan-500/20"
                />
                <StatsCard
                    title="Achievements"
                    value={stats.achievements}
                    icon={<Trophy className="text-yellow-500" size={24} />}
                    color="border-yellow-500/20"
                />
                <StatsCard
                    title="Total Users"
                    value="100+"
                    icon={<Users className="text-purple-500" size={24} />}
                    color="border-purple-500/20"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        <p className="text-slate-400 text-sm">System setup complete. Waiting for new data...</p>
                        {/* Placeholder for activity feed */}
                    </div>
                </div>
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                    <div className="space-x-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Add Notice</button>
                        <button className="bg-slate-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-600">Create Event</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatsCard = ({ title, value, icon, color }) => (
    <div className={`bg-slate-800 p-6 rounded-xl border ${color} shadow-lg relative overflow-hidden`}>
        <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 transform translate-x-2 -translate-y-2">
            {icon}
        </div>
        <div className="flex items-center space-x-4">
            <div className="p-3 bg-slate-900 rounded-lg">
                {icon}
            </div>
            <div>
                <p className="text-slate-400 text-sm font-medium">{title}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
            </div>
        </div>
    </div>
);

export default AdminOverview;

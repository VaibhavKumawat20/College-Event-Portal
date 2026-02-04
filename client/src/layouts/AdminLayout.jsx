import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Bell, Calendar, Users, Trophy, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
    const { logout } = useAuth();
    const location = useLocation();

    const navItems = [
        { path: '/admin', label: 'Overview', icon: <LayoutDashboard size={20} /> },
        { path: '/admin/notices', label: 'Manage Notices', icon: <Bell size={20} /> },
        { path: '/admin/events', label: 'Manage Events', icon: <Calendar size={20} /> },
        { path: '/admin/achievements', label: 'Achievements', icon: <Trophy size={20} /> },
        { path: '/admin/users', label: 'Users', icon: <Users size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-slate-900 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-800 border-r border-slate-700 hidden md:flex flex-col">
                <div className="h-16 flex items-center justify-center border-b border-slate-700">
                    <span className="text-xl font-bold text-white">Admin<span className="text-blue-500">Panel</span></span>
                </div>
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                    : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                                }`}
                        >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-slate-700">
                    <button
                        onClick={logout}
                        className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-8 md:px-6">
                    <h1 className="text-xl font-bold text-white">
                        {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
                    </h1>
                    <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">A</div>
                    </div>
                </header>

                <div className="p-6 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;

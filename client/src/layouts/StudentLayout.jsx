import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Bell, Calendar, ClipboardList, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const StudentLayout = () => {
    const { logout, user } = useAuth();
    const location = useLocation();

    const navItems = [
        { path: '/dashboard', label: 'Overview', icon: <LayoutDashboard size={20} /> },
        { path: '/dashboard/registrations', label: 'My Registrations', icon: <ClipboardList size={20} /> },
        { path: '/dashboard/profile', label: 'My Profile', icon: <User size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-slate-900 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-800 border-r border-slate-700 hidden md:flex flex-col">
                <div className="h-16 flex items-center justify-center border-b border-slate-700">
                    <span className="text-xl font-bold text-white">Student<span className="text-blue-500">Portal</span></span>
                </div>

                <div className="p-4 items-center flex space-x-3 border-b border-slate-700 bg-slate-800/50">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                        {user?.name?.charAt(0) || 'S'}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-white text-sm font-bold truncate">{user?.name}</p>
                        <p className="text-slate-400 text-xs truncate">{user?.department} - {user?.year} Yr</p>
                    </div>
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
                    <div className="my-4 border-t border-slate-700 pt-4">
                        <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Explore</p>
                        <Link to="/events" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
                            <Calendar size={20} />
                            <span className="font-medium">Browse Events</span>
                        </Link>
                        <Link to="/notices" className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
                            <Bell size={20} />
                            <span className="font-medium">View Notices</span>
                        </Link>
                    </div>
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
                <header className="md:hidden h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-4">
                    <h1 className="text-lg font-bold text-white">Student Portal</h1>
                    {/* Mobile menu button would go here */}
                </header>

                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default StudentLayout;

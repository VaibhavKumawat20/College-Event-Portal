import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LogIn, User } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold text-blue-500">
                            Campus<span className="text-white">Event</span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/events" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Events</Link>
                            <Link to="/achievements" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Achievements</Link>

                            {user ? (
                                <>
                                    <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="text-blue-400 hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium">
                                        Dashboard
                                    </Link>
                                    <button onClick={logout} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <div className="flex space-x-2 ml-4">
                                    <Link to="/login" className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors border border-slate-700">
                                        Login
                                    </Link>
                                    <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none">
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900">
                        <Link to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
                        <Link to="/events" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Events</Link>
                        <Link to="/achievements" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Achievements</Link>
                        {user ? (
                            <>
                                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="text-blue-400 hover:text-blue-300 block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
                                <button onClick={logout} className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Login</Link>
                                <Link to="/register" className="text-blue-500 hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

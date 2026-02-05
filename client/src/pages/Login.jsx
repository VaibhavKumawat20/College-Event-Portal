import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student'); // Default role
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(email, password, role);

            // CHECK: If user logged in but role doesn't match the selected tab
            if (userData.role !== role) {
                // Option A: Auto-redirect them to their actual role
                // Option B: Show an error (we'll do error for clarity, or auto-redirect)

                // Let's auto-redirect for better UX, but warn them?
                // Actually, if I am a student and I login on Admin tab, I should just go to Student Dashboard.
                if (userData.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            } else {
                navigate(role === 'admin' ? '/admin' : '/dashboard');
            }

        } catch (err) {
            console.error("Login Error:", err);
            setError(err.response?.data?.message || 'Login failed. Check server connection.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
            <div className="max-w-md w-full bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700">
                <h2 className="text-3xl font-bold text-white text-center mb-8">Welcome Back</h2>

                {error && <div className="bg-red-500/10 text-red-500 p-3 rounded mb-4 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Role Toggle */}
                    <div className="bg-slate-900 p-1 rounded-lg flex mb-6">
                        <button
                            type="button"
                            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${role === 'student' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                            onClick={() => setRole('student')}
                        >
                            Student
                        </button>
                        <button
                            type="button"
                            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${role === 'admin' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                            onClick={() => setRole('admin')}
                        >
                            Admin
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="you@college.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-transform transform active:scale-95"
                    >
                        Login as {role === 'admin' ? 'Admin' : 'Student'}
                    </button>
                </form>

                <p className="mt-6 text-center text-slate-400 text-sm">
                    Don't have an account? <a href="/register" className="text-blue-400 hover:text-blue-300">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;

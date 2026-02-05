import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        department: '',
        year: ''
    });
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ ...formData, role: 'student' }); // Force student role
            navigate('/dashboard');
        } catch (err) {
            console.error("Registration failed:", err);
            const msg = err.response?.data?.message || err.message || 'Registration failed';
            setError(msg);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 py-12">
            <div className="max-w-md w-full bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700">
                <h2 className="text-3xl font-bold text-white text-center mb-8">Create Account</h2>

                {error && <div className="bg-red-500/10 text-red-500 p-3 rounded mb-4 text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                            placeholder="john@college.edu"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Department</label>
                            <select
                                name="department"
                                required
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                value={formData.department}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="CS">CS</option>
                                <option value="IT">IT</option>
                                <option value="Mech">Mech</option>
                                <option value="Civil">Civil</option>
                                <option value="Electrical">Electrical</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Year</label>
                            <select
                                name="year"
                                required
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                value={formData.year}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="1">1st</option>
                                <option value="2">2nd</option>
                                <option value="3">3rd</option>
                                <option value="4">4th</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-transform transform active:scale-95 mt-4"
                    >
                        Register Student
                    </button>
                </form>

                <p className="mt-6 text-center text-slate-400 text-sm">
                    Already have an account? <a href="/login" className="text-blue-400 hover:text-blue-300">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;

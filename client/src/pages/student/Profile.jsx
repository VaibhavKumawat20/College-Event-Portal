import { useAuth } from '../../context/AuthContext';

const Profile = () => {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-6">My Profile</h2>
            <div className="bg-slate-800 rounded-xl max-w-2xl border border-slate-700 overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-600 to-cyan-500"></div>
                <div className="px-6 pb-6">
                    <div className="relative -top-12 mb-[-30px]">
                        <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center border-4 border-slate-800">
                            <span className="text-3xl font-bold text-white">{user.name.charAt(0)}</span>
                        </div>
                    </div>

                    <div className="mt-6 pt-6">
                        <h3 className="text-2xl font-bold text-white">{user.name}</h3>
                        <p className="text-slate-400 capitalize">{user.role}</p>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs text-slate-500 uppercase font-bold">Email</label>
                                <p className="text-white mt-1">{user.email}</p>
                            </div>
                            {user.role === 'student' && (
                                <>
                                    <div>
                                        <label className="text-xs text-slate-500 uppercase font-bold">Department</label>
                                        <p className="text-white mt-1">{user.department}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-slate-500 uppercase font-bold">Year</label>
                                        <p className="text-white mt-1">{user.year} Year</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

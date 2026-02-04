import { useEffect, useState } from 'react';
import { Plus, Trash2, Calendar, FileText } from 'lucide-react';
import api from '../../api/axios';

const ManageNotices = () => {
    const [notices, setNotices] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', expiryDate: '' });

    const fetchNotices = async () => {
        try {
            const res = await api.get('/notices?type=active'); // Fetch all or filter
            setNotices(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    const handleDelete = async (id) => {
        if (confirm('Are you sure?')) {
            try {
                await api.delete(`/notices/${id}`);
                setNotices(notices.filter(n => n._id !== id));
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/notices', formData);
            setIsModalOpen(false);
            setFormData({ title: '', description: '', expiryDate: '' });
            fetchNotices();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Manage Notices</h2>
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <Plus size={18} />
                    <span>Add Notice</span>
                </button>
            </div>

            <div className="grid gap-4">
                {notices.map(notice => (
                    <div key={notice._id} className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-bold text-white">{notice.title}</h3>
                            <p className="text-slate-400 mt-1">{notice.description}</p>
                            <div className="flex items-center space-x-4 mt-3 text-sm text-slate-500">
                                <span className="flex items-center space-x-1"><Calendar size={14} /> <span>Posted: {new Date(notice.postedDate).toLocaleDateString()}</span></span>
                                {notice.expiryDate && <span className="text-red-400">Expires: {new Date(notice.expiryDate).toLocaleDateString()}</span>}
                            </div>
                        </div>
                        <button onClick={() => handleDelete(notice._id)} className="text-red-400 hover:text-red-300 p-2">
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-slate-700">
                        <h3 className="text-xl font-bold text-white mb-4">Add New Notice</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Notice Title"
                                required
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                            <textarea
                                placeholder="Description"
                                required
                                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white h-24"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                            <div>
                                <label className="text-sm text-slate-400">Expiry Date (Optional)</label>
                                <input
                                    type="date"
                                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                                    value={formData.expiryDate}
                                    onChange={e => setFormData({ ...formData, expiryDate: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Post Notice</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageNotices;

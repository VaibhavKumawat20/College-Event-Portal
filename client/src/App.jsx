import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';

import AdminLayout from './layouts/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import ManageNotices from './pages/admin/ManageNotices';
import ManageEvents from './pages/admin/ManageEvents';

import StudentLayout from './layouts/StudentLayout';
import StudentOverview from './pages/student/StudentOverview';
import MyRegistrations from './pages/student/MyRegistrations';
import Profile from './pages/student/Profile';

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-slate-900 text-white">
        <Navbar />
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="notices" element={<ManageNotices />} />
              <Route path="events" element={<ManageEvents />} />
            </Route>

            {/* Student Routes */}
            <Route path="/dashboard" element={<StudentLayout />}>
              <Route index element={<StudentOverview />} />
              <Route path="registrations" element={<MyRegistrations />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;

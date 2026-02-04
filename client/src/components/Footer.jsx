const Footer = () => {
    return (
        <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-900 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <span className="text-xl font-bold text-white mb-4 block">Campus<span className="text-blue-500">Event</span></span>
                    <p className="text-sm">
                        Streamlining college events and notices for a smarter campus experience.
                    </p>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-blue-500">Home</a></li>
                        <li><a href="#" className="hover:text-blue-500">Events</a></li>
                        <li><a href="#" className="hover:text-blue-500">Achievements</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-3">Contact</h3>
                    <p className="text-sm">College Admin Block</p>
                    <p className="text-sm">admin@college.edu</p>
                    <div className="flex space-x-4 mt-4">
                        {/* Social Icons Placeholder */}
                        <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">F</div>
                        <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">I</div>
                        <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">T</div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-900 text-center text-sm">
                &copy; {new Date().getFullYear()} CampusEvent Automation. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

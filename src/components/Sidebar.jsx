import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiSettings } from 'react-icons/fi';

const Sidebar = ({ isSidebarOpen }) => {
    return (
        <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
            w-64 bg-gradient-to-b from-green-900 to-green-800 text-white transition-transform duration-300 
            fixed md:static h-full min-h-screen z-40`}>
            <div className="p-6 flex items-center space-x-3">
                <img src="/army-logo.png" alt="Army Logo" className="w-10 h-10" />
                <h2 className={`text-xl font-bold ${!isSidebarOpen && 'hidden'}`}>BA Command Center</h2>
            </div>
            <nav className="mt-8">
                <Link to="/" className="flex items-center px-6 py-3 text-white bg-green-950">
                    <FiHome className="h-5 w-5 min-w-[20px]" />
                    <span className={`mx-3 ${!isSidebarOpen && 'hidden'}`}>Command Dashboard</span>
                </Link>
                <Link to="/exam" className="flex items-center px-6 py-3 text-gray-200 hover:bg-green-700">
                    <FiSettings className="h-5 w-5 min-w-[20px]" />
                    <span className={`mx-3 ${!isSidebarOpen && 'hidden'}`}>Exam</span>
                </Link>
                <Link to="/settings" className="flex items-center px-6 py-3 text-gray-200 hover:bg-green-700">
                    <FiSettings className="h-5 w-5 min-w-[20px]" />
                    <span className={`mx-3 ${!isSidebarOpen && 'hidden'}`}>Settings</span>
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
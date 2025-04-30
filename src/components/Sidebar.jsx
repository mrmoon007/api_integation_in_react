import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiSettings } from 'react-icons/fi';
import { PiExamDuotone } from 'react-icons/pi';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <div className={`${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-20'} 
            bg-gradient-to-b from-green-900 to-green-800 text-white transition-all duration-300 
            fixed md:static h-full min-h-screen z-40`}>
            <div className="p-6 flex items-center space-x-3">
                <img src="/army-logo.png" alt="Army Logo" className="w-10 h-10" />
                <h2 className={`text-xl font-bold transition-opacity duration-300 ${!isSidebarOpen ? 'md:hidden' : ''}`}>
                    BA Command Center
                </h2>
            </div>
            <nav className="mt-8">
                <Link 
                    to="/" 
                    className={`flex items-center px-6 py-3 text-white ${currentPath === '/' ? 'bg-green-950' : 'hover:bg-green-700'}`}
                >
                    <FiHome className="h-5 w-5 min-w-[20px]" />
                    <span className={`mx-3 ${!isSidebarOpen ? 'md:hidden' : ''}`}>Command Dashboard</span>
                </Link>
                <Link 
                    to="/exam" 
                    className={`flex items-center px-6 py-3 text-gray-200 ${currentPath.includes('/exam') ? 'bg-green-950' : 'hover:bg-green-700'}`}
                >
                    <PiExamDuotone className="h-5 w-5 min-w-[20px]" />
                    <span className={`mx-3 ${!isSidebarOpen && 'hidden'}`}>Exam</span>
                </Link>
                <Link 
                    to="/settings" 
                    className={`flex items-center px-6 py-3 text-gray-200 ${currentPath === '/settings' ? 'bg-green-950' : 'hover:bg-green-700'}`}
                >
                    <FiSettings className="h-5 w-5 min-w-[20px]" />
                    <span className={`mx-3 ${!isSidebarOpen && 'hidden'}`}>Settings</span>
                </Link>
            </nav>
        </div>
    );
};

export default Sidebar;
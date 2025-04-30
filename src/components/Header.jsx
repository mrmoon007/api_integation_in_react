import React from 'react';
import { FiMenu, FiLogOut } from 'react-icons/fi';
import { FaUserShield } from 'react-icons/fa';

const Header = ({ isSidebarOpen, setIsSidebarOpen, handleLogout }) => {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
            <div className="flex items-center justify-between px-4 lg:px-8 py-4">
                <div className="flex items-center">
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="hidden lg:flex mr-4 text-gray-600 hover:text-green-700"
                    >
                        <FiMenu size={24} />
                    </button>
                    <h1 className="text-xl lg:text-2xl font-bold text-green-900">Command Dashboard</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <FaUserShield className="text-green-700" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Col. John Doe</span>
                    </div>
                    <button 
                        onClick={handleLogout} 
                        className="flex items-center px-3 md:px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-300"
                    >
                        <FiLogOut className="h-5 w-5 md:mr-2" />
                        <span className="hidden md:inline">Logout</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
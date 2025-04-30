import React, { useState } from 'react';
import { FiX, FiMenu } from 'react-icons/fi';
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiService from '../services/apiService';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = async (e) => {
        e.preventDefault();
        
        try {
            const response = await ApiService.post('/logout');
            if (response.status === 200) {
                toast.success('Logout successful!', {
                    position: "top-right"
                });
                localStorage.removeItem("accessToken");
                localStorage.removeItem("userData");
                window.location.href = '/sign-in';
            }
        } catch (error) {
            toast.error(`Logout failed: ${error.message}`, {
                position: "top-right"
            });
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <ToastContainer/>
            <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="fixed z-50 top-4 left-4 bg-green-700 text-white p-2 rounded-full shadow-lg md:hidden"
            >
                {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            <Sidebar isSidebarOpen={isSidebarOpen} />

            <div className="flex-1 flex flex-col min-h-screen">
                <Header 
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    handleLogout={handleLogout}
                />

                <main className="flex-1 p-4 md:p-8 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
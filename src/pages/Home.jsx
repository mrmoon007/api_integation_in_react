import React, { useState } from 'react';
import { FiHome, FiUsers, FiSettings, FiPackage, FiLogOut, FiMenu, FiX, FiMessageSquare } from 'react-icons/fi';
import { FaChartBar, FaMedal, FaUserShield, FaClipboardList, FaBriefcaseMedical } from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer } from 'recharts';
import ApiService from '../services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const stats = [
        { title: 'Total Personnel', value: '12,234', change: '+120', icon: <FaUserShield className="h-6 w-6" /> },
        { title: 'Medical Units', value: '89', change: '+3', icon: <FaBriefcaseMedical className="h-6 w-6" /> },
        { title: 'Active Operations', value: '24', change: '+2', icon: <FaMedal className="h-6 w-6" /> },
    ];

    const chartData = [
        { name: 'Jan', personnel: 12000, operations: 20, medical: 85 },
        { name: 'Feb', personnel: 12100, operations: 22, medical: 86 },
        { name: 'Mar', personnel: 12150, operations: 23, medical: 87 },
        { name: 'Apr', personnel: 12180, operations: 23, medical: 88 },
        { name: 'May', personnel: 12200, operations: 24, medical: 88 },
        { name: 'Jun', personnel: 12234, operations: 24, medical: 89 },
    ];

    const handleLogout = (e) => {
        e.preventDefault();
        
        ApiService.post(`/logout`, []).then((response) => {
            console.log(response);
            
            if (response.status === 200) {

                toast.success(`Success Notification !  Logout successfully`, {
                    position: "top-right"
                });
                localStorage.removeItem("accessToken");
                localStorage.removeItem("userData");
                // localStorage.removeItem("userToken");
                // navigate("../home", { replace: true });
                window.location.href = '/sign-in'
                // navigate('/sign-in')
            }
        }).catch((error) => {
            toast.error(`Error Notification ! ${error}`, {
                position: "top-right"
            });
        });

    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <ToastContainer/>
            {/* Toggle Button for Mobile */}
            <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="fixed z-50 top-4 left-4 bg-green-700 text-white p-2 rounded-full shadow-lg md:hidden"
            >
                {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Sidebar */}
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
                    <Link to="/personnel" className="flex items-center px-6 py-3 text-gray-200 hover:bg-green-700">
                        <FaUserShield className="h-5 w-5 min-w-[20px]" />
                        <span className={`mx-3 ${!isSidebarOpen && 'hidden'}`}>Personnel</span>
                    </Link>
                    <Link to="/operations" className="flex items-center px-6 py-3 text-gray-200 hover:bg-green-700">
                        <FaClipboardList className="h-5 w-5 min-w-[20px]" />
                        <span className={`mx-3 ${!isSidebarOpen && 'hidden'}`}>Operations</span>
                    </Link>
                    <Link to="/medical" className="flex items-center px-6 py-3 text-gray-200 hover:bg-green-700">
                        <FaBriefcaseMedical className="h-5 w-5 min-w-[20px]" />
                        <span className={`mx-3 ${!isSidebarOpen && 'hidden'}`}>Medical Units</span>
                    </Link>
                    <Link to="/settings" className="flex items-center px-6 py-3 text-gray-200 hover:bg-green-700">
                        <FiSettings className="h-5 w-5 min-w-[20px]" />
                        <span className={`mx-3 ${!isSidebarOpen && 'hidden'}`}>Settings</span>
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
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

                <main className="flex-1 p-4 md:p-8 overflow-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 transform transition-all hover:scale-105 hover:shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm font-semibold">{stat.title}</p>
                                        <p className="text-2xl md:text-3xl font-bold text-green-900 mt-1">{stat.value}</p>
                                        <p className="text-green-600 text-sm mt-2">+{stat.change} this month</p>
                                    </div>
                                    <div className="text-green-700 bg-green-50 p-3 rounded-full">{stat.icon}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
                        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
                            <h3 className="text-lg font-bold text-green-900 mb-4">Personnel Strength</h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="name" stroke="#374151" />
                                        <YAxis stroke="#374151" />
                                        <Tooltip />
                                        <Area
                                            type="monotone"
                                            dataKey="personnel"
                                            stroke="#065f46"
                                            fill="#065f46"
                                            fillOpacity={0.2}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
                            <h3 className="text-lg font-bold text-green-900 mb-4">Operations & Medical Units</h3>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="name" stroke="#374151" />
                                        <YAxis stroke="#374151" />
                                        <Tooltip />
                                        <Line
                                            type="monotone"
                                            dataKey="operations"
                                            stroke="#065f46"
                                            strokeWidth={2}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="medical"
                                            stroke="#0d9488"
                                            strokeWidth={2}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
                        <h2 className="text-lg font-bold text-green-900 mb-4">Recent Activities</h2>
                        <div className="space-y-4">
                            {/* Activity content remains the same */}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Home;
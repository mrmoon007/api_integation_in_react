import React from 'react';
import { FaUserShield, FaBriefcaseMedical, FaMedal } from 'react-icons/fa';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer } from 'recharts';

const Home = () => {
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

    const recentActivities = [
        { id: 1, title: 'Operation Briefing', time: '2 hours ago', description: 'New operation briefing scheduled for Delta Squad' },
        { id: 2, title: 'Medical Supply Update', time: '4 hours ago', description: 'Medical supplies restocked in Sector B' },
        { id: 3, title: 'Personnel Transfer', time: '6 hours ago', description: '15 personnel transferred to Alpha Unit' },
        { id: 4, title: 'Training Complete', time: '8 hours ago', description: 'Advanced combat training completed for 45 personnel' },
    ];

    return (
        <>
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
                    {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                                <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                                <p className="text-gray-400 text-xs mt-2">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiPaperclip, FiMoreVertical, FiSearch, FiArrowLeft } from 'react-icons/fi';
import ApiService from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import Pusher from 'pusher-js';

const Chat = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageLoading, setMessageLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('userData')));
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    // Add this new effect for auto-scrolling
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const fetchUsers = async () => {
        try {
            const response = await ApiService.get('users');
            setUsers(response.data.data);
            // Set first user as default selected
            if (response.data.data.length > 0) {
                const firstUser = response.data.data[0];
                console.log('first user -'.firstUser, response.data.data[0]);


                setSelectedUser(firstUser);
                fetchMessages(firstUser.id);
            }
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch users');
            setLoading(false);
        }
    };

    const fetchMessages = async (userId) => {
        setMessageLoading(true);
        try {
            const response = await ApiService.get(`messages/${userId}`);
            // console.log(response.data.data);

            setMessages(response.data.data);
            setMessageLoading(false);
        } catch (err) {
            console.error('Failed to fetch messages:', err);
            setMessageLoading(false);
        }
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        fetchMessages(user.id);
    };

    useEffect(() => {
        // Initialize Pusher
        const pusher = new Pusher('1ee126cf809c5acf27c8', {
            cluster: 'mt1',
            encrypted: true
        });

        // Subscribe to the channel
        const channel = pusher.subscribe('chat');

        // Listen for new messages
        channel.bind('new-message', (data) => {
            // if (data.receiver_id === currentUser?.id || data.sender_id === currentUser?.id) {
                console.log('hello 55', selectedUser);
                
                fetchMessages(selectedUser?.id);
            // }
        });

        // Cleanup on unmount
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [selectedUser, currentUser]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        
        if (message.trim() && selectedUser) {
            try {
                const messageData = {
                    receiver_id: selectedUser.id,
                    message: message.trim()
                };

                const response = await ApiService.post('messages/send', messageData);

                if (response.status === 200) {
                    setMessage('');
                    // Messages will update automatically through Pusher
                }
            } catch (err) {
                console.error('Failed to send message:', err);
            }
        }
    };

    const handleBackToDashboard = () => {
        navigate('/');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Contacts Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <button 
                            onClick={handleBackToDashboard}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <FiArrowLeft className="text-gray-600 text-xl" />
                        </button>
                        <span className="font-semibold text-gray-700">Messages</span>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                        />
                        <FiSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                </div>
                <div className="overflow-y-auto h-[calc(100vh-73px)]">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-green-600">Loading users...</div>
                        </div>
                    ) : error ? (
                        <div className="text-red-500 p-4">{error}</div>
                    ) : (
                        users.map((user) => (
                            <div
                                key={user.id}
                                onClick={() => handleUserSelect(user)}
                                className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 
                                    ${selectedUser?.id === user.id ? 'bg-gray-100' : ''}`}
                            >
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                        <span className="text-lg font-semibold text-green-700">
                                            {user.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-gray-400"></div>
                                </div>
                                <div className="ml-4 flex-1">
                                    <h3 className="text-sm font-semibold">{user.name}</h3>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-lg font-semibold text-green-700">
                                {selectedUser?.name?.charAt(0)}
                            </span>
                        </div>
                        <div className="ml-3">
                            <h2 className="text-lg font-semibold">{selectedUser?.name}</h2>
                            <p className="text-sm text-green-500">Online</p>
                        </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <FiMoreVertical />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messageLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-green-600">Loading messages...</div>
                        </div>
                    ) : (
                        <>
                            {messages.map((msg) => {
                                const isCurrentUserMessage = msg.sender_id === currentUser?.id;
                                return (
                                    <div key={msg.id} className={`flex ${isCurrentUserMessage ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%] rounded-lg p-3 ${isCurrentUserMessage ? 'bg-green-600 text-white' : 'bg-white'}`}>
                                            {!isCurrentUserMessage && (
                                                <p className="text-xs text-gray-500 mb-1">{selectedUser?.name}</p>
                                            )}
                                            <p className="text-sm">{msg.message}</p>
                                            <p className={`text-xs ${isCurrentUserMessage ? 'text-green-100' : 'text-gray-400'} text-right mt-1`}>
                                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="bg-white p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                        <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
                            <FiPaperclip className="text-gray-500" />
                        </button>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-green-500"
                        />
                        <button
                            type="submit"
                            className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            <FiSend />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Chat;
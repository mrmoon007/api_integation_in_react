import React from 'react';
import { Link } from 'react-router-dom';

const NoPageFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-green-800">404</h1>
                <h2 className="text-4xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
                <p className="text-gray-600 mt-4 mb-8">
                    The page you are looking for doesn't exist or has been moved.
                </p>
                <Link 
                    to="/" 
                    className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NoPageFound;
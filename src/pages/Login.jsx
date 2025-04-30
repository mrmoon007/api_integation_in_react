import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
import ApiService from '../services/apiService';

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', formData);
    ApiService.post(`/login`, formData).then((response) => {
      if (response.status === 200) {

        toast.success(`Success Notification !  Login successfully`, {
          position: "top-right"
        });
        
        localStorage.setItem("accessToken", response.data.access_token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        // navigate("../home", { replace: true });
        window.location.href = '/home'
        // navigate("/home");
      }
    })
      .catch((error) => {
        toast.error(`Error Notification ! ${error}`, {
          position: "top-right"
        });
      });


  };

  // Calculate fill levels
  const getInputFillLevel = (value, maxLength = 30) => {
    const percentage = (value.length / maxLength) * 100;
    return Math.min(percentage, 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer/>
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative shadow-md rounded-md">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-300 hover:shadow-lg"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              <div
                className="absolute bottom-0 left-0 h-0.5 bg-indigo-500 transition-all duration-300 rounded-full"
                style={{ width: `${getInputFillLevel(formData.email)}%` }}
              />
            </div>
            <div className="relative shadow-md rounded-md">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-300 hover:shadow-lg"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <div
                className="absolute bottom-0 left-0 h-0.5 bg-indigo-500 transition-all duration-300 rounded-full"
                style={{ width: `${getInputFillLevel(formData.password)}%` }}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-0.5"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            If you are not registered?{' '}
            <Link
              className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-300 hover:underline"
              to='/signup'
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiService from '../services/apiService';
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
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
    console.log('Register attempt with:', formData);
    ApiService.post(`/register`, formData).then((response) => {
      if (response.status === 200) {

        toast.success(`Success Notification !  Register successfully`, {
          position: "top-right"
        });

        // localStorage.setItem("accessToken", response.data.access_token);
        // localStorage.setItem("userData", JSON.stringify(response.data.user));
        // navigate("../home", { replace: true });
        // window.location.href = '/home'
        navigate("/sign-in");
      }
    })
      .catch((error) => {
        toast.error(`Error Notification ! ${error}`, {
          position: "top-right"
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer/>
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-2xl transform hover:scale-[1.01] transition-all duration-300">
        <div className="animate-fadeIn">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 animate-slideDown">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6 animate-slideUp" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative shadow-md rounded-md transform transition-all duration-300 hover:translate-x-1">
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300 hover:shadow-lg focus:scale-[1.01]"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

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
            </div>

            <div className="relative shadow-md rounded-md">
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input
                id="confirmPassword"
                name="password_confirmation"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-300 hover:shadow-lg"
                placeholder="Confirm Password"
                value={formData.password_confirmation}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="text-center mt-4 animate-fadeIn">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-all duration-300 hover:underline transform hover:scale-105"
              to="/sign-in"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
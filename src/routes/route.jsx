import { Navigate, Outlet } from 'react-router-dom';
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Register from '../pages/Register';
import Home from '../pages/Home';
import Exam from '../pages/Exam';
import ExamForm from '../pages/ExamForm';
import NoPageFound from '../pages/NoPageFound';

const protectedRoutes = (isLoggedIn) => ({
    path: '/',
    element: isLoggedIn ? <Layout /> : <Navigate to="/sign-in" />,
    children: [
        { path: '/', element: <Home /> },
        { path: '/home', element: <Home /> },
        { path: '/exam', element: <Exam /> },
        { path: '/exam/:id', element: <ExamForm /> }, // Changed to use URL parameter
        {path: '*', element: <NoPageFound/>},
    ],
});

const publicRoutes = (isLoggedIn) => ({
    path: '/',
    element: !isLoggedIn ? <Outlet /> : <Navigate to="/home" />,
    children: [
        { path: '/', element: <Login /> },
        { path: '/sign-in', element: <Login /> },
        { path: '/signup', element: <Register /> },
        // {path: '/contact', element: <Contact/>},
        // {path: '/about', element: <About/>},
        // {path: '*', element: <NoPageFound/>},
    ],
});

const routes = (isLoggedIn) => [protectedRoutes(isLoggedIn), publicRoutes(isLoggedIn)];
export default routes;
import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import Header from '../layout/Header';
import Blog from '../pages/Dashboard/Blog';
import Profile from '../pages/Dashboard/Profile';
import BlogCategoryList from '../pages/Dashboard/BlogCategoryList';
import BlogList from '../pages/Dashboard/BlogList';
import { getToken } from '../helper/tokenHelper';
import { useDispatch, useSelector } from 'react-redux';

const PrivateRoutes = () => {
    const navigate = useNavigate()
    const { isAuthenticated } = useSelector((state) => state.root.auth);
    console.log("build formula", isAuthenticated)
   

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    useEffect(() => {
        if (!getToken()) navigate("/login")
    }, [])

    return (
        <div>
            <Header />
            <Routes>
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog-list" element={<BlogList />} />
                <Route path="/categories-list" element={<BlogCategoryList />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </div>
    );
};

export default PrivateRoutes;


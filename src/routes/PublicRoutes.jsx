import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginForm from '../pages/Auth/LoginForm';
import SignUpForm from '../pages/Auth/SignUpForm';

const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
    );
};

export default PublicRoutes;

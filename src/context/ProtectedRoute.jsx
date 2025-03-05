import React, { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { Outlet, Navigate } from 'react-router';
import Layout from '../layouts/dashboard';

const ProtectedRoute = ({ children }) => {
    const { auth, isLoading } = useContext(AuthContext);

    if (!auth) {
        return <Navigate to="/login" replace />
    }

    if (!auth.verified) {
        return <Navigate to="/notVerified" />
    }

    return <Layout><Outlet /></Layout>
};

export default ProtectedRoute;

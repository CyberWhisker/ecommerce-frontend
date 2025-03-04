import React, { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { Outlet, Navigate } from 'react-router';
import Layout from '../layouts/dashboard';

const ProtectedRoute = ({ children }) => {
    const { auth, isLoading } = useContext(AuthContext);

    return auth ?
        <Layout>
            <Outlet />
        </Layout>
        : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

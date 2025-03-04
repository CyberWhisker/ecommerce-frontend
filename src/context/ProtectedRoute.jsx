import React, { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
    const { auth, isLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    if (isLoading) {
        return <div>Loading...</div>; // Optionally show a loading state
    }
    useEffect(() => {
        if (!auth) {
            navigate('/login')
        }
    }, [auth])

    return children; // Show the children (dashboard) if the user is authenticated
};

export default ProtectedRoute;

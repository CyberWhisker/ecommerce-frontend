import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>; // Optionally show a loading state
    }

    if (!isAuthenticated) {
        loginWithRedirect()
    }

    return children; // Show the children (dashboard) if the user is authenticated
};

export default ProtectedRoute;

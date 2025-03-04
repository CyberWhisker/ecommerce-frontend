import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import { createBrowserRouter, RouterProvider } from "react-router";
import App from './App';
import Layout from './layouts/dashboard';
import Dashboard from './pages/Dashboard/Dashboard';
import LandingLayout from './layouts/landing';
import LandingPage from './pages/Landing/LandingPage';
import Users from './pages/Users/Users';
import ProtectedRoute from './context/ProtectedRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthLayout from './layouts/auth';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import { AuthProvider } from './context/AuthContext';

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: LandingLayout,
        children: [
          {
            path: '',
            Component: LandingPage,
          },
        ]
      },
      {
        path: '/login',
        Component: AuthLayout,
        children: [
          {
            path: '',
            Component: Login,
          },
        ]
      },
      {
        path: '/register',
        Component: AuthLayout,
        children: [
          {
            path: '',
            Component: Register,
          },
        ]
      },
      {
        path: '/dashboard',
        Component: () => (

          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: '',
            Component: () => (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            ),
          },
        ]
      },
      {
        path: '/user',
        Component: Layout,
        children: [
          {
            path: '',
            Component: () => (
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            ),
          },
        ]
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="1095160726391-43792gti1phme0ni89t8bdov9m1dfkgv.apps.googleusercontent.com">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)

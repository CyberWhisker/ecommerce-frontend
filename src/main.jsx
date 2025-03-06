import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import { createBrowserRouter, RouterProvider } from "react-router";
import App from './App';
import LandingLayout from './layouts/landing';
import LandingPage from './pages/Landing/LandingPage';
import ProtectedRoute from './context/ProtectedRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthLayout from './layouts/auth';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import Users from './pages/Admin/Users/Users';
import TechStack from './pages/Admin/TechStack/TechStack';
import { ForgotPassword, Login, NotVerified, Register, ResetPassword, Verify } from './pages/Auth';

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
        path: '/verify-email',
        Component: LandingLayout,
        children: [
          {
            path: '',
            Component: Verify,
          },
        ]
      },
      {
        path: '/notVerified',
        Component: LandingLayout,
        children: [
          {
            path: '',
            Component: NotVerified,
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
        path: '/forgotPassword',
        Component: AuthLayout,
        children: [
          {
            path: '',
            Component: ForgotPassword,
          },
        ]
      },
      {
        path: '/reset-password',
        Component: AuthLayout,
        children: [
          {
            path: '',
            Component: ResetPassword,
          },
        ]
      },
      {
        path: '/dashboard',
        Component: ProtectedRoute,
        children: [
          {
            path: '',
            Component: Dashboard
          },
        ]
      },
      {
        path: '/user',
        Component: ProtectedRoute,
        children: [
          {
            path: '',
            Component: Users,
          },
        ]
      },
      {
        path: '/techStack',
        Component: ProtectedRoute,
        children: [
          {
            path: '',
            Component: TechStack,
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

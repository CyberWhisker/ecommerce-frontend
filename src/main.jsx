import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import { createBrowserRouter, RouterProvider } from "react-router";
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import Layout from './layouts/dashboard';
import Dashboard from './pages/Dashboard/Dashboard';
import LandingLayout from './layouts/landing';
import LandingPage from './pages/Landing/LandingPage';
import Users from './pages/Users/Users';

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
        path: '/dashboard',
        Component: Layout,
        children: [
          {
            path: '',
            Component: Dashboard,
          },
        ]
      },
      {
        path: '/user',
        Component: Layout,
        children: [
          {
            path: '',
            Component: Users,
          },
        ]
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-gezmtakfp1hntbsd.us.auth0.com"
      clientId="gACcsxpPns4hKvehBEpkh49NMoRscLWd"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </StrictMode>,
)

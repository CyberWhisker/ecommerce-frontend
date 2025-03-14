import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { CreditCard, DashboardOutlined, Event, Inventory, Person, Settings, TravelExplore, Web } from '@mui/icons-material';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { AuthContext } from './context/AuthContext';

// Navigation Configurations
const NAVIGATION_CONFIG = {
  admin: [
    { kind: 'header', title: 'Main items' },
    { title: 'Dashboard', segment: 'dashboard', icon: <DashboardOutlined /> },
    { title: 'Users', segment: 'user', icon: <Person /> },
    { title: 'Inventory', segment: 'inventory', icon: <Inventory /> },
    { kind: 'header', title: 'Maintenance' },
    { title: 'Projects', segment: 'projects', icon: <Web /> },
    { title: 'Experience', segment: 'experience', icon: <Event /> },
    { title: 'Tech Stack', segment: 'techStack', icon: <Settings /> },
  ],
};

// Branding Configurations
const BRANDING_CONFIG = {
  admin: { title: 'CyberWhiskers', homeUrl: '/' },
  ecommerce: { title: 'Ecommerce', homeUrl: '/' },
};

// Helper function to get current navigation and branding
const getConfig = (pathname) => {
  if (pathname.startsWith('/ecommerce')) {
    return { navigation: NAVIGATION_CONFIG.ecommerce, branding: BRANDING_CONFIG.ecommerce };
  }
  return { navigation: NAVIGATION_CONFIG.admin, branding: BRANDING_CONFIG.admin };
};

function App() {
  const location = useLocation();
  const { auth, isLoading } = useContext(AuthContext);
  const [session, setSession] = useState(null);

  // Get navigation and branding dynamically
  const { navigation, branding } = useMemo(() => getConfig(location.pathname), [location.pathname]);

  // Set session when auth changes
  useEffect(() => {
    if (auth) {
      setSession({
        user: { name: auth.name, email: auth.email, image: auth.picture },
      });
    }
  }, [auth]);

  // Authentication handlers
  const authentication = useMemo(() => ({
    signIn: () => setSession(auth),
    signOut: () => setSession(null),
  }), [auth]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <ReactRouterAppProvider
      navigation={navigation}
      branding={branding}
      authentication={authentication}
      session={session}
    >
      <Outlet />
    </ReactRouterAppProvider>
  );
}

export default App;

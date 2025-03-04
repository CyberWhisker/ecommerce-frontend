import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Outlet } from 'react-router'
import { DashboardOutlined, Person, Settings } from '@mui/icons-material'
import { ReactRouterAppProvider } from '@toolpad/core/react-router'
import { AuthContext } from './context/AuthContext';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    title: 'Dashboard',
    segment: 'dashboard',
    icon: <DashboardOutlined />,
  },
  {
    segment: 'user',
    title: 'Users',
    icon: <Person />,
  },
  {
    kind: 'header',
    title: 'Maintenance',
  },
  {
    segment: 'techStack',
    title: 'Tech Stack',
    icon: <Settings />,
  },
];

const BRANDING = {
  title: 'CyberWhiskers',
  homeUrl: '/dashboard'
};

function App() {
  const { auth, user, isLoading } = useContext(AuthContext)
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (auth) {
      setSession({
        user: {
          name: auth.name,
          email: auth.email,
          image: auth.picture,
        },
      });
    }
  }, [auth, user]);

  const authentication = useMemo(() => {
    return {
      signIn: () => {
        setSession(auth);
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ReactRouterAppProvider
      navigation={NAVIGATION} // Make sure you have this defined somewhere
      branding={BRANDING}     // Make sure you have this defined somewhere
      authentication={authentication}
      session={session}
    >
      <Outlet /> {/* This is where nested routes will render */}
    </ReactRouterAppProvider>
  );
}

export default App
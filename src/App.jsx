import React from 'react'
import { Outlet } from 'react-router'
import { DashboardOutlined, Person } from '@mui/icons-material'
import { ReactRouterAppProvider } from '@toolpad/core/react-router'

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
];

const BRANDING = {
  title: 'CyberWhiskers',
  homeUrl: '/dashboard'
};

function App() {
  return (
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet />
    </ReactRouterAppProvider>
  )
}

export default App
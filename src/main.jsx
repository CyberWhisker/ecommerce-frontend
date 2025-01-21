import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import { BrowserRouter } from "react-router";
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-gezmtakfp1hntbsd.us.auth0.com"
      clientId="gACcsxpPns4hKvehBEpkh49NMoRscLWd"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>,
)

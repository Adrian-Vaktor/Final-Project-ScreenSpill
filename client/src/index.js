import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react'


const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN
const auth0Client = process.env.REACT_APP_AUTH0_CLIENT_ID
const callBackUrl = `http://localhost:8000/ux/project-manager`


// console.log(auth0Domain, auth0Client);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
    domain={auth0Domain}
    clientId={auth0Client}
    redirectUri={callBackUrl}
    >
        <App />
    </Auth0Provider>
);

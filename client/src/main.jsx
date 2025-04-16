import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './Router/AppRoutes.jsx'
import AuthProvider from './Providers/AuthProviders.jsx'
import { ApolloProvider } from '@apollo/client'

import client from '../apoloClient.js'
createRoot(document.getElementById('root')).render(

    <ApolloProvider client={client}>
        <StrictMode>
            <AuthProvider>
                <AppRoutes></AppRoutes>
            </AuthProvider>
        </StrictMode>
    </ApolloProvider>
    ,
)

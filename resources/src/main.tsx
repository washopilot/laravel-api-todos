// import '../js/bootstrap';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './pages/App';
import Login from './pages/Login';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider>
            {/* <App /> */}
            <Login />
        </ChakraProvider>
    </React.StrictMode>
);

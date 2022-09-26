// import '../js/bootstrap';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { AppStateContextProvider } from './AppStateContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider>
            <AppStateContextProvider>
                <App />
            </AppStateContextProvider>
        </ChakraProvider>
    </React.StrictMode>
);

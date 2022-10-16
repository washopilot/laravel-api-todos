import { Container, Link } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { AppStateContextProvider } from '../AppStateContext';

import TodosCheck from '../components/TodosCheck';

const App = () => {
    return (
        <AppStateContextProvider>
            <Container py={5} alignContent={'space-between'} textAlign={'center'}>
                <TodosCheck />
                <Link as={ReactRouterLink} to="/login" sx={{ textDecoration: 'underline' }} color={'blue.400'}>
                    Link to Login Page
                </Link>
            </Container>
        </AppStateContextProvider>
    );
};

export default App;

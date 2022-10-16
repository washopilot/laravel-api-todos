import { Container } from '@chakra-ui/react';
import { AppStateContextProvider } from '../AppStateContext';

import TodosCheck from '../components/TodosCheck';

const App = () => {
    return (
        <AppStateContextProvider>
            <Container py={5} alignContent={'space-between'} textAlign={'center'}>
                <TodosCheck />
            </Container>
        </AppStateContextProvider>
    );
};

export default App;

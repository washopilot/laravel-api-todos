import { Container } from '@chakra-ui/react';

import TodosCheck from './components/TodosCheck';

const App = () => {
    return (
        <>
            <Container py={5} alignContent={'space-between'} textAlign={'center'}>
                <TodosCheck />
            </Container>
        </>
    );
};

export default App;

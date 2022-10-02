import { Container, Spinner } from '@chakra-ui/react';
import { useContext } from 'react';

import TodosCheck from './components/TodosCheck';

import { AppStateContext } from './AppStateContext';

const App = () => {
    const { spinLoading } = useContext(AppStateContext);

    return (
        <>
            <Container py={5} alignContent={'space-between'} textAlign={'center'}>
                {/* <InputTodoValue /> */}
                {spinLoading && (
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                        mx={'auto'}
                    />
                )}
                {!spinLoading && <TodosCheck />}
            </Container>
        </>
    );
};

export default App;

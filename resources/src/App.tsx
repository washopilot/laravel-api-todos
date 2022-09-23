import { Container, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import TodosCheck from './components/TodosCheck';
import { Todo, TodoState } from './models';

const url = `${import.meta.env.VITE_APP_URL}/api/todos`;

const App = () => {
    const [appState, setAppState] = useState([] as TodoState[]);
    const [loading, setLoading] = useState(true);

    const handleFetch = () => {
        setLoading(true);
        axios.get<Todo[]>(url).then((response) => {
            console.count('axios get all todos');
            setAppState(
                response.data.map((value) => {
                    return { ...value, isLoading: false };
                })
            );
            setLoading(false);
        });
    };

    const handlePut = (todoChanged: Todo) => {
        handleUpdateState({ ...todoChanged, isLoading: true });

        axios.put<Todo>(`${url}/${todoChanged.id}`, todoChanged).then(() => {
            console.count('axios put todoChanged');
            handleUpdateState({ ...todoChanged, isLoading: false });
        });
    };

    const handleUpdateState = useCallback(
        (todoStateChanged: TodoState) => {
            const appStateCopy = [...appState];
            appStateCopy[appStateCopy.findIndex((obj) => obj.id === todoStateChanged.id)] = todoStateChanged;
            setAppState(appStateCopy);
        },
        [appState]
    );

    // Onload, fetch data and set loading to false when complete
    useEffect(() => {
        handleFetch();
    }, []);

    useEffect(() => {
        console.count('cambio app state');
    }, [appState]);

    const onChangeAppState = (todoChanged: Todo) => {
        console.count('todo cambiado');
        handlePut(todoChanged);
    };

    return (
        <>
            <Container py={5} alignContent={'space-between'} textAlign={'center'}>
                {loading && (
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                        mx={'auto'}
                    />
                )}
                {!loading && <TodosCheck appState={appState} onChangeAppState={onChangeAppState} />}
            </Container>
        </>
    );
};

export default App;

import { Container, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import CustomTodosCheck from './components/CustomTodosCheck';
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
        axios.put<Todo>(`${url}/${todoChanged.id}`, todoChanged).then(() => {
            console.count('axios put todoChanged');
            // Actualiza estado de carga del todo
            setAppState((todosState) => {
                return todosState.map((value) => {
                    if (value.id == todoChanged.id) {
                        return {
                            ...value,
                            isLoading: false
                        };
                    }
                    return value;
                });
            });
        });
    };

    // Onload, fetch data and set loading to false when complete
    useEffect(() => {
        handleFetch();
    }, []);

    useEffect(() => {
        console.count('cambio app state');
    }, [appState]);

    const onChangeAppState = (todoState: TodoState) => {
        let todoStateChanged = todoState;
        // Actualiza estado general y coloca isLoadindg en true
        setAppState((todosState) => {
            return todosState.map((value) => {
                if (value.id == todoState.id) {
                    todoStateChanged = {
                        id: todoState.id,
                        status: todoState.status,
                        todo: value.todo,
                        isLoading: false
                    };
                    return todoStateChanged;
                }
                return value;
            });
        });

        console.count('todo cambiado');
        console.log(todoState);

        handlePut(todoStateChanged);

        // handleFetch(); // refresh view
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
                {!loading && <CustomTodosCheck appState={appState} onChangeAppState={onChangeAppState} />}
            </Container>
        </>
    );
};

export default App;

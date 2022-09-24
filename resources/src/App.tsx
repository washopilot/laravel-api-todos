import { Container, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import TodosCheck from './components/TodosCheck';
import { AppLoadingState, Todo, Todo as TodoState } from './models';

const url = `${import.meta.env.VITE_APP_URL}/api/todos`;

const App = () => {
    const [appState, setAppState] = useState([] as TodoState[]);
    const [appLoadingState, setAppLoadingState] = useState({} as AppLoadingState);
    const [loading, setLoading] = useState(true);

    const handleFetch = () => {
        setLoading(true);
        axios.get<Todo[]>(url).then((response) => {
            console.count('axios get all todos');
            setAppState(response.data);
            setAppLoadingState(
                response.data.reduce((acc, value) => {
                    return { ...acc, [value.id]: false };
                }, {})
            );
            setLoading(false);
        });
    };

    const handlePut = (todoChanged: Todo) => {
        setAppLoadingState((prev) => {
            return {
                ...prev,
                [todoChanged.id]: true
            };
        });

        axios.put<Todo>(`${url}/${todoChanged.id}`, todoChanged).then(() => {
            console.count('axios put todoChanged');
            handleUpdateState({ ...todoChanged });
            setAppLoadingState((prev) => {
                return {
                    ...prev,
                    [todoChanged.id]: false
                };
            });
        });
    };

    const handleDelete = (todoDelete: string) => {
        setAppLoadingState((prev) => {
            return {
                ...prev,
                [todoDelete]: true
            };
        });
        axios.delete<Todo>(`${url}/${todoDelete}`).then(() => {
            console.count('axios delete');
            setAppState((prev) => {
                return prev.filter((obj) => obj.id !== Number(todoDelete));
            });
            setAppLoadingState((prev) => {
                delete prev[Number(todoDelete)];
                return prev;
            });
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

    useEffect(() => {
        console.count('cambio appLoading state');
    }, [appLoadingState]);

    const onChangeAppState = (todoChanged: Todo) => {
        console.count('todo cambiado');
        handlePut(todoChanged);
    };

    const onHandleDelete = (todoDelete: string) => {
        console.count(`todo eliminado`);
        handleDelete(todoDelete);
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
                {!loading && (
                    <TodosCheck
                        appState={appState}
                        appLoadingState={appLoadingState}
                        onChangeAppState={onChangeAppState}
                        onHandleDelete={onHandleDelete}
                    />
                )}
            </Container>
        </>
    );
};

export default App;

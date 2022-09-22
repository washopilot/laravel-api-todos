import { Container, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import CustomTodosCheck from './components/CustomTodosCheck';
import { Todo } from './models';

const url = `${import.meta.env.VITE_APP_URL}/api/todos`;

const App: React.FC = () => {
    const [todos, setTodos] = useState([] as Todo[]);
    const [loading, setLoading] = useState(true);

    const handleFetch = () => {
        setLoading(true);
        axios.get<Todo[]>(url).then((response) => {
            console.count('axios get all todos');
            setTodos(
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
            setTodos((todos) => {
                return todos.map((value) => {
                    if (value.id == todoChanged.id) {
                        todoChanged = {
                            ...value,
                            isLoading: false
                        };
                        return todoChanged;
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
        console.count('cambio todos state');
    }, [todos]);

    const onChangeTodos = (todo: Todo) => {
        let todoChanged = todo;
        // Actualiza estado general y coloca isLoadindg en true
        setTodos((todos) => {
            return todos.map((value) => {
                if (value.id == todo.id) {
                    todoChanged = {
                        id: todo.id,
                        status: todo.status,
                        todo: value.todo,
                        isLoading: true
                    };
                    return todoChanged;
                }
                return value;
            });
        });

        console.count('todo cambiado');
        handlePut(todoChanged);

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
                {!loading && <CustomTodosCheck todos={todos} onChangeTodos={onChangeTodos} />}
            </Container>
        </>
    );
};

export default App;

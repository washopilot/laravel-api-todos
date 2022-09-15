import { Container, Spinner } from '@chakra-ui/react';
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';

import CustomTodosCheck from './components/CustomTodosCheck';
import { Todo } from './models';

const App: React.FC = () => {
    const [todos, setTodos] = useState([] as Todo[]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = `${import.meta.env.VITE_APP_URL}/api/todos`;
        axios.get(url).then((response: AxiosResponse<Todo[]>) => {
            console.log(response);
            setTodos(response.data);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        console.log(todos);
    }, [todos]);

    const onChangeTodos = (todo: Todo) => {
        setTodos((todos) => {
            return todos.map((value) => {
                if (value.id == todo.id) {
                    return {
                        id: todo.id,
                        status: todo.status,
                        todo: value.todo
                    };
                }
                return value;
            });
        });
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
                <CustomTodosCheck todos={todos} onChangeTodos={onChangeTodos} />
            </Container>
        </>
    );
};

export default App;

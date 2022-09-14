import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from '@chakra-ui/react';

import CustomTodoCheck from './components/CustomTodoCheck';
import { Todo } from './models';

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const url = `${import.meta.env.VITE_APP_URL}/api/todos`;
        axios.get(url).then((response: AxiosResponse<Todo[]>) => {
            console.log(response);
            setTodos(response.data);
        });
    }, []);

    useEffect(() => {
        console.log(todos);
    }, [todos]);

    return (
        <>
            <Container py={5} alignContent={'space-between'}>
                {todos.map((todo: Todo) => (
                    <CustomTodoCheck key={todo.id} onTodo={todo} />
                ))}
            </Container>
        </>
    );
};

export default App;

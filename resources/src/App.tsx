import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import axios, { AxiosResponse } from 'axios';
import './App.css';

import { Todo } from './models';
import CustomTodoCheck from './components/CustomTodoCheck';

const App: React.FC = () => {
    const [show, setShow] = useState(true);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
            <Container className="my-5">
                <Row className="justify-content-between">
                    <Col xs="auto" />
                    <Col xs="10">
                        {todos.map((todo: Todo) => (
                            <CustomTodoCheck
                                key={todo.id}
                                todoId={todo.id}
                                todoStatus={todo.status == 'complete'}
                                todoDescription={todo.todo}
                            />
                        ))}
                    </Col>
                    <Col xs="auto" />
                </Row>
            </Container>
        </>
    );
};

export default App;

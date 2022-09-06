import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './App.css';

import { Todo } from './models';
import CustomTodoCheck from './components/CustomTodoCheck';

interface Respuesta {
    data: Todo[];
}

const App: React.FC = () => {
    const [show, setShow] = useState(true);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const url: string = 'http://127.0.0.1:8000/api/todos';

        function getTodos(url: string): Promise<Respuesta> {
            return fetch(url).then((response) => response.json());
        }

        getTodos(url).then((value) => setTodos(value.data));
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

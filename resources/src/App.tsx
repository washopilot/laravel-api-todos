import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, Col, Container, Form, Nav, Navbar, NavDropdown, Row, Stack } from 'react-bootstrap';
import reactLogo from './assets/react.svg';
import './App.css';

import { Todo } from './models';

interface Respuesta {
    data: Todo[];
}

const App: React.FC = () => {
    const [show, setShow] = useState(true);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url: string = 'http://127.0.0.1:8000/api/todos';

        function getTodos(url: string): Promise<Respuesta> {
            return fetch(url).then((response) => response.json());
        }

        getTodos(url).then((value) => console.log(value, value.data[0].status));
    }, []);

    return (
        <>
            <Container className="my-5">
                <Row className="justify-content-between">
                    <Col xs="auto" />
                    <Col xs="8">
                        <Stack direction="horizontal" gap={3}>
                            <Form.Control className="me-auto" placeholder="Add your item here..." />
                            <Button variant="secondary">Submit</Button>
                            <div className="vr" />
                            <Button variant="outline-danger">Reset</Button>
                        </Stack>
                    </Col>
                    <Col xs="auto" />
                </Row>
            </Container>
        </>
    );
};

export default App;

import React, { useState } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';

const CustomTodoCheck = ({
    todoStatus,
    todoDescription,
    todoId
}: {
    todoStatus: boolean;
    todoDescription: string;
    todoId: number;
}) => {
    const [checked, setChecked] = useState(todoStatus);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.checked);
        setChecked(e.target.checked);
    };

    return (
        <Stack direction="horizontal" gap={3} className="justify-content-between my-3">
            <Form.Check type="switch" id={`switch-${todoId}`}>
                <Form.Check.Input defaultChecked={checked} onChange={handleChange}></Form.Check.Input>
                <Form.Check.Label className={!checked ? 'text-muted text-muted-custom' : ''}>
                    {todoDescription}
                </Form.Check.Label>
            </Form.Check>
            <div>
                <Button className="mx-1" size="sm" variant="primary" onClick={() => console.log('Editar')}>
                    Editar
                </Button>
                <Button className="mx-1" size="sm" variant="danger" onClick={() => console.log('Eliminar')}>
                    Eliminar
                </Button>
            </div>
        </Stack>
    );
};

export default CustomTodoCheck;

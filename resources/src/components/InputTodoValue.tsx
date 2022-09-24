import { Button, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { useState } from 'react';
import { Todo } from '../models';

interface InputTodoValueProps {
    onHandleInput: (todoInput: Todo) => void;
}

const InputTodoValue = ({ onHandleInput }: InputTodoValueProps) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputValue = () => {
        if (inputValue) {
            onHandleInput({ todo: inputValue, status: 'incomplete', id: -1 });
            setInputValue('');
        }
    };

    return (
        <InputGroup>
            <Input
                placeholder="Introduzca aquí su tarea"
                _placeholder={{ opacity: 1, color: 'gray.400', fontStyle: 'italic' }}
                marginBottom={4}
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleInputValue();
                    }
                }}
            />
            <InputRightAddon>
                <Button onClick={handleInputValue}>Enviar</Button>
            </InputRightAddon>
        </InputGroup>
    );
};

export default InputTodoValue;

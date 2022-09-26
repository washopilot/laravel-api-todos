import { Button, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { useContext, useState } from 'react';

import { AppStateContext } from '../AppStateContext';

const InputTodoValue = () => {
    const [inputValue, setInputValue] = useState('');
    const { inputTodoState } = useContext(AppStateContext);

    const handleInputValue = () => {
        if (inputValue) {
            inputTodoState({ todo: inputValue, status: 'incomplete', id: -1 });
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

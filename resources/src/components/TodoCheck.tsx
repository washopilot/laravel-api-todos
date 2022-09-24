import { DeleteIcon } from '@chakra-ui/icons';
import {
    Button,
    Flex,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Skeleton,
    Switch
} from '@chakra-ui/react';
import { useState } from 'react';
import { Todo as TodoState } from '../models';

interface ITodoCheckProps {
    todoState: TodoState;
    todoLoadingState: boolean;
    onHandleChangeSwitch: (todoState: TodoState) => void;
    onHandleDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const TodoCheck = ({ todoState, todoLoadingState, onHandleChangeSwitch, onHandleDelete }: ITodoCheckProps) => {
    const [valueInput, setValueInput] = useState(todoState.todo);
    const [checked, setChecked] = useState(todoState.status == 'complete');

    const handleChangeSwitch = () => {
        setChecked((p) => !p);
        onHandleChangeSwitch({ ...todoState, status: !checked ? 'complete' : 'incomplete' });
    };

    return (
        <Skeleton key={todoState.id} isLoaded={!todoLoadingState}>
            <Flex minWidth={'max-content'} alignItems="center" my={1}>
                <HStack flex={1} alignItems={'center'}>
                    <InputGroup size={'md'}>
                        <InputLeftAddon>
                            <Switch id={`${todoState.id}`} isChecked={checked} onChange={handleChangeSwitch} />
                        </InputLeftAddon>
                        <Input
                            sx={checked ? { ' textDecoration': 'line-through #3182ce' } : undefined}
                            onChange={(e) => setValueInput(e.currentTarget.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    console.log(valueInput);
                                }
                            }}
                            onBlur={(e) => console.log(e.currentTarget.value)}
                            value={valueInput}
                        />
                        <InputRightAddon>
                            <Button
                                onClick={onHandleDelete}
                                size={'xs'}
                                colorScheme="red"
                                px={2}
                                id={`${todoState.id}`}>
                                <DeleteIcon />
                            </Button>
                        </InputRightAddon>
                    </InputGroup>
                </HStack>
            </Flex>
        </Skeleton>
    );
};

export default TodoCheck;

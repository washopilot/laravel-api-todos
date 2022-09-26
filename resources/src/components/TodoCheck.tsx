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
import { Todo as TodoState, TodosLoadingState } from '../models';

interface ITodoCheckProps {
    todoState: TodoState;
    todosLoadingState: TodosLoadingState;
    updateTodoState: (todoState: TodoState) => void;
    deleteTodoState: (id: number) => void;
}

const TodoCheck = ({ todoState, todosLoadingState, updateTodoState, deleteTodoState }: ITodoCheckProps) => {
    const [valueInput, setValueInput] = useState(todoState.todo);
    const [checked, setChecked] = useState(todoState.status == 'complete');

    const handleChangeSwitch = () => {
        setChecked((p) => !p);
        updateTodoState({ ...todoState, status: !checked ? 'complete' : 'incomplete' });
    };

    const onHandleDelete = () => {
        deleteTodoState(todoState.id);
    };

    return (
        <Skeleton key={todoState.id} isLoaded={!todosLoadingState[todoState.id]}>
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

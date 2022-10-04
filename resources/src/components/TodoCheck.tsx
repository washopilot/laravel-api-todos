import { DeleteIcon } from '@chakra-ui/icons';
import {
    Button,
    Flex,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Switch,
    Tooltip
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

    const handleDelete = () => {
        deleteTodoState(todoState.id);
    };

    const handleUpdate = () => {
        console.log(valueInput);
        if (valueInput && valueInput != todoState.todo && valueInput != '')
            updateTodoState({ ...todoState, todo: valueInput });
    };

    return (
        <Flex minWidth={'max-content'} alignItems="center" py={1}>
            <HStack flex={1} alignItems={'center'}>
                <InputGroup size={'xs'}>
                    <InputLeftAddon py={4}>
                        <Switch id={`${todoState.id}`} isChecked={checked} onChange={handleChangeSwitch} size={'md'} />
                    </InputLeftAddon>
                    <Input
                        id={`${todoState.id}`}
                        sx={checked ? { ' textDecoration': 'line-through #3182ce' } : undefined}
                        onChange={(e) => setValueInput(e.currentTarget.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleUpdate();
                            }
                        }}
                        onBlur={handleUpdate}
                        value={valueInput}
                        py={4}
                        fontSize={'md'}
                    />
                    <InputRightAddon py={4}>
                        <Tooltip label="Delete Todo">
                            <Button
                                isLoading={todosLoadingState[todoState.id]}
                                onClick={handleDelete}
                                size={'xs'}
                                colorScheme="red"
                                py={2}
                                id={`${todoState.id}`}
                                variant={'outline'}>
                                <DeleteIcon />
                            </Button>
                        </Tooltip>
                    </InputRightAddon>
                </InputGroup>
            </HStack>
        </Flex>
    );
};

export default TodoCheck;

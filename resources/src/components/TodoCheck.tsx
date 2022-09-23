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
import { TodoState } from '../models';

interface ITodoCheckProps {
    todoState: TodoState;
    onHandleChangeSwitch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TodoCheck = ({ todoState, onHandleChangeSwitch }: ITodoCheckProps) => {
    const [valueInput, setValueInput] = useState(todoState.todo);

    const checked = todoState.status == 'complete';
    return (
        <Skeleton key={todoState.id} isLoaded={!todoState.isLoading}>
            <Flex minWidth={'max-content'} alignItems="center" my={1}>
                <HStack flex={1} alignItems={'center'}>
                    <InputGroup size={'md'}>
                        <InputLeftAddon>
                            <Switch id={`${todoState.id}`} isChecked={checked} onChange={onHandleChangeSwitch} />
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
                            <Button size={'xs'} colorScheme="red" px={2}>
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

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, Flex, FormLabel, HStack, Spacer, StackDivider } from '@chakra-ui/react';
import { Switch } from '@chakra-ui/switch';
import React from 'react';

import { Todo } from '../models';

interface ICustomTodosCheckProps {
    todos: Todo[];
    onChangeTodos: (todo: Todo) => void;
}

const CustomTodosCheck = ({ todos, onChangeTodos }: ICustomTodosCheckProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const todo = { id: Number(e.target.id), status: e.target.checked ? 'complete' : 'incomplete' };
        onChangeTodos(todo);
    };

    return (
        <>
            {todos.map((todo) => {
                const checked = todo.status == 'complete';
                return (
                    <Flex key={todo.id} minWidth="max-content" alignItems="center" gap="2">
                        <HStack alignItems={'center'} divider={<StackDivider borderColor="gray.200" />} spacing={5}>
                            <Switch id={`${todo.id}`} onChange={handleChange} isChecked={checked} />
                            <FormLabel
                                my={1}
                                htmlFor={`${todo.id}`}
                                sx={checked ? { ' textDecoration': 'line-through #3182ce' } : undefined}
                                style={{ userSelect: 'none' }}>
                                {todo.todo}
                            </FormLabel>
                        </HStack>
                        <Spacer />
                        <ButtonGroup size="xs">
                            <Button leftIcon={<EditIcon />} colorScheme="blue">
                                Editar
                            </Button>
                            <Button leftIcon={<DeleteIcon />} colorScheme="red">
                                Borrar
                            </Button>
                        </ButtonGroup>
                    </Flex>
                );
            })}
        </>
    );
};

export default CustomTodosCheck;

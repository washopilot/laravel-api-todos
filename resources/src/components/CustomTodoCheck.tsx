import { Button, ButtonGroup, Flex, FormLabel, HStack, Spacer, StackDivider } from '@chakra-ui/react';
import { Switch } from '@chakra-ui/switch';
import React, { useEffect, useState } from 'react';
import { Todo } from '../models';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const CustomTodoCheck = ({ onTodo }: { onTodo: Todo }) => {
    const [checked, setChecked] = useState(onTodo.status == 'complete');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.checked);
        setChecked(e.target.checked);
    };

    return (
        <>
            <Flex minWidth="max-content" alignItems="center" gap="2">
                <HStack alignItems={'center'} divider={<StackDivider borderColor="gray.200" />} spacing={5}>
                    <Switch id={`todo-${onTodo.id}`} onChange={handleChange} isChecked={checked} />
                    <FormLabel
                        my={1}
                        htmlFor={`todo-${onTodo.id}`}
                        sx={checked ? { ' textDecoration': 'line-through #3182ce' } : undefined}
                        style={{ userSelect: 'none' }}>
                        {onTodo.todo}
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
        </>
    );
};

export default CustomTodoCheck;

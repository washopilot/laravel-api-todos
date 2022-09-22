import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
    Button,
    ButtonGroup,
    Flex,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    Skeleton,
    Spacer
} from '@chakra-ui/react';
import { Switch } from '@chakra-ui/switch';
import React from 'react';

import { Todo, TodoState } from '../models';

interface ICustomTodosCheckProps {
    appState: TodoState[];
    onChangeAppState: (todoState: TodoState) => void;
}

const CustomTodosCheck = ({ appState, onChangeAppState }: ICustomTodosCheckProps) => {
    const handleChangeSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const todoChanged: Todo = {
            id: Number(e.target.id),
            status: e.target.checked ? 'complete' : 'incomplete'
        };
        onChangeAppState(todoChanged);
    };

    return (
        <>
            {appState.map((todoState) => {
                const checked = todoState.status == 'complete';
                return (
                    <Skeleton key={todoState.id} isLoaded={!todoState.isLoading}>
                        <Flex minWidth="max-content" alignItems="center" my={1}>
                            <HStack alignItems={'center'}>
                                <InputGroup>
                                    <InputLeftAddon>
                                        <Switch
                                            id={`${todoState.id}`}
                                            isChecked={checked}
                                            onChange={handleChangeSwitch}
                                        />
                                    </InputLeftAddon>
                                    <Input
                                        sx={checked ? { ' textDecoration': 'line-through #3182ce' } : undefined}
                                        style={{ userSelect: 'none' }}
                                        defaultValue={todoState.todo}></Input>
                                </InputGroup>
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
                    </Skeleton>
                );
            })}
        </>
    );
};

export default CustomTodosCheck;

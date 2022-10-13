import { useContext, useRef, useState } from 'react';

import TodoCheck from './TodoCheck';

import { EditIcon } from '@chakra-ui/icons';
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    ButtonGroup,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Spacer,
    Text,
    Tooltip,
    useDisclosure
} from '@chakra-ui/react';

import axios from 'axios';
import { AppStateContext } from '../AppStateContext';

const url = `${import.meta.env.VITE_APP_URL}/api`;

const TodosCheck = () => {
    const {
        categoryState,
        categoryLoadingState,
        todosState,
        todosLoadingState,
        deleteTodoState,
        updateTodoState,
        updateCategoryState,
        inputTodoState,
        deleteCategoryState,
        inputCategoryState
    } = useContext(AppStateContext);

    const [valueModal, setValueModal] = useState<string>('');
    const [categoryId, setCategoryId] = useState<number>(0);

    const valueRef = useRef<HTMLInputElement>(null);
    const initialFocusRef = useRef(null);

    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

    const handleEditCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
        const tempCategory = categoryState.find((value) => value.id === Number(e.currentTarget.id));
        setValueModal(tempCategory!.description);
        setCategoryId(tempCategory!.id);
        onModalOpen();
        console.log('Open modal');
    };

    const handleSave = async () => {
        await updateCategoryState(categoryId, valueRef.current!.value);
        onModalClose();
    };

    const handleNewTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
        inputTodoState(Number(e.currentTarget.id));
    };

    const handleDeleteCategory = async () => {
        await deleteCategoryState(categoryId);
        onModalClose();
    };

    const handleNewCategory = () => {
        inputCategoryState();
    };

    const handleAuthenticate = () => {
        axios.defaults.withCredentials = true;
        axios.get<any>(`${url}`.replace('api', 'sanctum/csrf-cookie')).then((response) => {
            console.log('autenticado');
            console.log(response.config.headers);
        });
    };

    const handleGetUser = () => {
        axios.defaults.withCredentials = true;
        axios.get<any>(`${url}/user`).then((response) => {
            console.log('usuario');
            console.log(response);
        });
    };

    const handleLogin = () => {
        const request = { email: 'washopilot@yahoo.com', password: 'root1979' };
        axios.defaults.withCredentials = true;
        axios.post(`${url}/login`, request).then((response) => {
            console.log('logueado');
            console.log(response);
        });
    };

    const handleLogout = () => {
        const request = { email: 'washopilot@yahoo.com', password: 'root1979' };
        axios.post(`${url}/logout`, request).then((response) => {
            console.log('logOut');

            console.log(response);
        });

        console.log('logOut');
    };

    return (
        <>
            <Accordion allowToggle>
                {categoryState.map((categoryState) => {
                    return (
                        <AccordionItem key={categoryState.id} w={'100%'}>
                            <h2>
                                <HStack>
                                    <Tooltip label="Edit Category">
                                        <Button
                                            onClick={handleEditCategory}
                                            size={'xs'}
                                            py={2}
                                            id={`${categoryState.id}`}>
                                            <EditIcon />
                                        </Button>
                                    </Tooltip>
                                    <AccordionButton _expanded={{ bg: 'blue.400', color: 'white' }}>
                                        <Box flex="1" textAlign="left">
                                            {categoryState.description}
                                            <Text fontWeight={'bold'}>TODOs</Text>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </HStack>
                            </h2>
                            <AccordionPanel p={2}>
                                {todosState
                                    .map((todoState) => {
                                        return (
                                            todoState.category_id == categoryState.id && (
                                                <TodoCheck
                                                    key={todoState.id}
                                                    todoState={todoState}
                                                    todosLoadingState={todosLoadingState}
                                                    deleteTodoState={deleteTodoState}
                                                    updateTodoState={updateTodoState}
                                                />
                                            )
                                        );
                                    })
                                    .reverse()}
                                <Flex py={2}>
                                    <Spacer />
                                    <Button
                                        id={`${categoryState.id}`}
                                        onClick={handleNewTodo}
                                        colorScheme="blue"
                                        size="xs">
                                        + Task
                                    </Button>
                                </Flex>
                            </AccordionPanel>
                        </AccordionItem>
                    );
                })}
            </Accordion>

            <Flex py={4}>
                <Button onClick={handleNewCategory} size="sm">
                    + Category
                </Button>
                <Spacer />
            </Flex>

            <Flex py={4}>
                <Button onClick={handleAuthenticate} size="md" mr={2}>
                    AUTHENTICATE
                </Button>
                <Button onClick={handleLogin} size="md" mr={2}>
                    LOGIN
                </Button>
                <Button onClick={handleGetUser} size="md" mr={2}>
                    GET USER
                </Button>
                <Button onClick={handleLogout} size="md" mr={2}>
                    LOGOUT
                </Button>
                <Spacer />
            </Flex>

            <Modal isOpen={isModalOpen} onClose={onModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Category</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Category name</FormLabel>
                            <Input
                                name="description"
                                defaultValue={valueModal}
                                placeholder="Set category name"
                                ref={valueRef}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Flex py={2} w={'100%'}>
                            <Popover initialFocusRef={initialFocusRef}>
                                {({ onClose }) => (
                                    <>
                                        <PopoverTrigger>
                                            <Button colorScheme={'red'}>Delete</Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverBody>
                                                Are you sure you want to continue with your action?
                                            </PopoverBody>
                                            <PopoverFooter display="flex" justifyContent="flex-end">
                                                <ButtonGroup size="sm">
                                                    <Button variant="outline" ref={initialFocusRef} onClick={onClose}>
                                                        Cancel
                                                    </Button>
                                                    <Button colorScheme="red" onClick={handleDeleteCategory}>
                                                        Apply
                                                    </Button>
                                                </ButtonGroup>
                                            </PopoverFooter>
                                        </PopoverContent>
                                    </>
                                )}
                            </Popover>
                            <Spacer />
                            <Button isLoading={categoryLoadingState} colorScheme="blue" mr={2} onClick={handleSave}>
                                Save
                            </Button>
                            <Button onClick={onModalClose}>Cancel</Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default TodosCheck;

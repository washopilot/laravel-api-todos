import { useContext, useState } from 'react';

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
    Text,
    Tooltip,
    useDisclosure
} from '@chakra-ui/react';
import { AppStateContext } from '../AppStateContext';

const TodosCheck = () => {
    const { categoryState, todosState, todosLoadingState, deleteTodoState, updateTodoState } =
        useContext(AppStateContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [valueModal, setValueModal] = useState<string>('');
    const [categoryId, setCategoryId] = useState<number>();

    const handleEditCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
        const tempCategory = categoryState.find((value) => value.id === Number(e.currentTarget.id));
        setValueModal(tempCategory!.description);
        setCategoryId(tempCategory?.id);
        onOpen();
        console.log('Se abre modal');
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Array.from(new FormData(e.currentTarget));
        console.log(Object.fromEntries(data), categoryId);
        onClose();
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
                                    <AccordionButton>
                                        <Box flex="1" textAlign="left">
                                            {categoryState.description}
                                            <Text fontWeight={'bold'}>TODOs</Text>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </HStack>
                            </h2>
                            <AccordionPanel p={2}>
                                {todosState.map((todoState) => {
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
                                })}
                            </AccordionPanel>
                        </AccordionItem>
                    );
                })}
            </Accordion>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Category</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSave}>
                        <ModalBody pb={6}>
                            <FormLabel>Category name</FormLabel>
                            <Input name="description" defaultValue={valueModal} placeholder="Set category name" />
                        </ModalBody>
                        <ModalFooter>
                            <Button isLoading={false} type={'submit'} colorScheme="blue" mr={3}>
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};

export default TodosCheck;

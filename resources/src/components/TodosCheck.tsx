import { useContext } from 'react';

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
    HStack,
    Text
} from '@chakra-ui/react';
import { AppStateContext } from '../AppStateContext';

const TodosCheck = () => {
    const { categoryState, todosState, todosLoadingState, deleteTodoState, updateTodoState } =
        useContext(AppStateContext);

    return (
        <>
            <Accordion allowToggle>
                {categoryState.map((categoryState) => {
                    return (
                        <AccordionItem key={categoryState.id} w={'100%'}>
                            <h2>
                                <HStack>
                                    <Button size={'xs'} colorScheme="blue" py={2} id={`${categoryState.id}`}>
                                        <EditIcon />
                                    </Button>
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
        </>
    );
};

export default TodosCheck;

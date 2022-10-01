import { useContext } from 'react';

import TodoCheck from './TodoCheck';

import { AppStateContext } from '../AppStateContext';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';

const TodosCheck = () => {
    const { categoryState, todosState, todosLoadingState, deleteTodoState, updateTodoState } =
        useContext(AppStateContext);

    return (
        <>
            <Accordion allowToggle>
                {categoryState.map((categoryState) => {
                    return (
                        <AccordionItem key={categoryState.id}>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        {categoryState.description}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel>
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

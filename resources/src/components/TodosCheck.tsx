import { useContext } from 'react';

import TodoCheck from './TodoCheck';

import { AppStateContext } from '../AppStateContext';

const TodosCheck = () => {
    const { todosState, todosLoadingState, deleteTodoState, updateTodoState } = useContext(AppStateContext);

    return (
        <>
            {todosState
                .map((todoState) => {
                    return (
                        <TodoCheck
                            key={todoState.id}
                            todoState={todoState}
                            todosLoadingState={todosLoadingState}
                            deleteTodoState={deleteTodoState}
                            updateTodoState={updateTodoState}
                        />
                    );
                })
                .reverse()}
        </>
    );
};

export default TodosCheck;

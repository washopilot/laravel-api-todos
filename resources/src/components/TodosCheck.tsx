import React from 'react';

import { AppLoadingState, Todo, Todo as TodoState } from '../models';
import TodoCheck from './TodoCheck';

interface ICustomTodosCheckProps {
    appState: TodoState[];
    appLoadingState: AppLoadingState;
    onChangeAppState: (todoChanged: Todo) => void;
}

const TodosCheck = ({ appState, appLoadingState, onChangeAppState }: ICustomTodosCheckProps) => {
    const handleChangeSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const todoChanged: Todo = {
            id: Number(e.target.id),
            status: e.target.checked ? 'complete' : 'incomplete',
            todo: appState.find((o) => o.id == Number(e.target.id))?.todo
        };
        onChangeAppState(todoChanged);
    };

    return (
        <>
            {appState.map((todoState) => {
                return (
                    <TodoCheck
                        key={todoState.id}
                        todoState={todoState}
                        todoLoadingState={appLoadingState[todoState.id]}
                        onHandleChangeSwitch={handleChangeSwitch}
                    />
                );
            })}
        </>
    );
};

export default TodosCheck;

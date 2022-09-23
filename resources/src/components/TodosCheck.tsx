import React from 'react';

import { Todo, TodoState } from '../models';
import TodoCheck from './TodoCheck';

interface ICustomTodosCheckProps {
    appState: TodoState[];
    onChangeAppState: (todoChanged: Todo) => void;
}

const TodosCheck = ({ appState, onChangeAppState }: ICustomTodosCheckProps) => {
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
                return <TodoCheck key={todoState.id} todoState={todoState} onHandleChangeSwitch={handleChangeSwitch} />;
            })}
        </>
    );
};

export default TodosCheck;

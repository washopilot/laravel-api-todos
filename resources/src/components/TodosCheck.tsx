import React from 'react';

import { AppLoadingState, Todo, Todo as TodoState } from '../models';
import TodoCheck from './TodoCheck';

interface ICustomTodosCheckProps {
    appState: TodoState[];
    appLoadingState: AppLoadingState;
    onChangeAppState: (todoChanged: Todo) => void;
    onHandleDelete: (todoDelete: string) => void;
}

const TodosCheck = ({ appState, appLoadingState, onChangeAppState, onHandleDelete }: ICustomTodosCheckProps) => {
    const handleChangeSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeAppState({
            id: Number(e.target.id),
            status: e.target.checked ? 'complete' : 'incomplete',
            todo: appState.find((o) => o.id == Number(e.target.id))?.todo
        });
    };
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onHandleDelete(e.currentTarget.id);

    return (
        <>
            {appState.map((todoState) => {
                return (
                    <TodoCheck
                        key={todoState.id}
                        todoState={todoState}
                        todoLoadingState={appLoadingState[todoState.id]}
                        onHandleChangeSwitch={handleChangeSwitch}
                        onHandleDelete={handleDelete}
                    />
                );
            })}
        </>
    );
};

export default TodosCheck;

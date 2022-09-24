import React from 'react';

import { AppLoadingState, Todo, Todo as TodoState } from '../models';
import TodoCheck from './TodoCheck';

interface ICustomTodosCheckProps {
    appState: TodoState[];
    appLoadingState: AppLoadingState;
    onChangeSwitchState: (todoChanged: Todo) => void;
    onHandleDelete: (todoDelete: string) => void;
}

const TodosCheck = ({ appState, appLoadingState, onChangeSwitchState, onHandleDelete }: ICustomTodosCheckProps) => {
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onHandleDelete(e.currentTarget.id);

    return (
        <>
            {appState
                .map((todoState) => {
                    return (
                        <TodoCheck
                            key={todoState.id}
                            todoState={todoState}
                            todoLoadingState={appLoadingState[todoState.id]}
                            onHandleChangeSwitch={(todoChanged: Todo) => {
                                onChangeSwitchState(todoChanged);
                                console.log('ups')
                            }}
                            onHandleDelete={handleDelete}
                        />
                    );
                })
                .reverse()}
        </>
    );
};

export default TodosCheck;

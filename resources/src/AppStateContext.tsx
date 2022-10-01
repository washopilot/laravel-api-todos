import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { Category, Todo, Todo as TodoState, TodosLoadingState } from './models';

const url = `${import.meta.env.VITE_APP_URL}/api/todos`;

export interface IAppStateContext {
    categoryState: Category[];
    todosState: TodoState[];
    todosLoadingState: TodosLoadingState;
    spinLoading: boolean;
    updateTodoState: (todoState: TodoState) => void;
    deleteTodoState: (id: number) => void;
    inputTodoState: (todoState: TodoState) => void;
}

const AppStateContext = createContext({} as IAppStateContext);

const AppStateContextProvider = ({ children }: { children: React.ReactNode }) => {
    // the value that will be given to the context
    const [categoryState, setCategoryState] = useState([] as Category[]);
    const [todosState, setTodosState] = useState([] as TodoState[]);
    const [spinLoading, setSpinLoading] = useState(false);
    const [todosLoadingState, setTodosLoadingState] = useState([] as TodosLoadingState);

    const handleFetch = () => {
        setSpinLoading(true);

        axios.get<Category[]>(url.replace('todos', 'categories')).then((response) => {
            console.count('axios get all categories');
            setCategoryState(response.data);
        });

        axios.get<Todo[]>(url).then((response) => {
            console.count('axios get all todos');
            setTodosState(response.data);
            setSpinLoading(false);
        });
    };

    const updateTodoState = (todoState: TodoState) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...request } = todoState;
        const appStateCopy = [...todosState];
        setTodosLoadingState((prevState) => ({ ...prevState, [todoState.id]: true }));
        axios.put<Todo>(`${url}/${todoState.id}`, request).then(() => {
            console.count('axios put Changed');
            appStateCopy[appStateCopy.findIndex((obj) => obj.id === todoState.id)] = { ...todoState };
            setTodosState(appStateCopy);
            setTodosLoadingState((prevState) => ({ ...prevState, [todoState.id]: false }));
        });
    };

    const deleteTodoState = (id: number) => {
        setTodosLoadingState((prevState) => ({ ...prevState, [id]: true }));
        axios.delete<Todo>(`${url}/${id}`).then(() => {
            console.count('axios delete');
            setTodosState((prevState) => prevState.filter((obj) => obj.id !== id));
            setTodosLoadingState((prevState) => ({ ...prevState, [id]: false }));
        });
    };

    const inputTodoState = (todoState: TodoState) => {
        console.count(`todo creado`);
        axios.post<TodoState>(`${url}`, todoState).then(() => {
            console.count('axios post todoInput');
            handleFetch();
        });
    };

    useEffect(() => {
        handleFetch();
    }, []);

    useEffect(() => {
        console.count('cambio en el State');
        // console.log('State', todosState);
    }, [todosState]);

    return (
        // the Provider gives access to the context to its children
        <AppStateContext.Provider
            value={{
                categoryState,
                todosState,
                todosLoadingState,
                spinLoading,
                deleteTodoState,
                updateTodoState,
                inputTodoState
            }}>
            {children}
        </AppStateContext.Provider>
    );
};

export { AppStateContext, AppStateContextProvider };

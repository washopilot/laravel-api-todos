import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { Category, Todo, TodosLoadingState } from './models';

const url = `${import.meta.env.VITE_APP_URL}/api`;

export interface IAppStateContext {
    categoryState: Category[];
    categoryLoadingState: boolean;
    todosState: Todo[];
    todosLoadingState: TodosLoadingState;
    updateTodoState: (todoState: Todo) => void;
    deleteTodoState: (id: number) => void;
    inputTodoState: (id: number) => void;
    updateCategoryState: (id: number, description: string) => void;
    deleteCategoryState: (id: number) => void;
    inputCategoryState: () => void;
}

const AppStateContext = createContext({} as IAppStateContext);

const AppStateContextProvider = ({ children }: { children: React.ReactNode }) => {
    // the value that will be given to the context
    const [categoryState, setCategoryState] = useState([] as Category[]);
    const [todosState, setTodosState] = useState([] as Todo[]);
    const [todosLoadingState, setTodosLoadingState] = useState([] as TodosLoadingState);
    const [categoryLoadingState, setCategoryLoadingState] = useState(false);

    const handleFetch = () => {
        axios.get<Category[]>(`${url}/categories`).then((response) => {
            console.count('axios get all categories');
            setCategoryState(response.data);
        });

        axios.get<Todo[]>(`${url}/todos`).then((response) => {
            console.count('axios get all todos');
            setTodosState(response.data);
        });
    };

    const updateTodoState = (todoState: Todo) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...request } = todoState;
        const appStateCopy = [...todosState];
        setTodosLoadingState((prev) => ({ ...prev, [todoState.id]: true }));
        axios.put<Todo>(`${url}/todos/${todoState.id}`, request).then(() => {
            console.count('axios put Changed');
            appStateCopy[appStateCopy.findIndex((obj) => obj.id === todoState.id)] = { ...todoState };
            setTodosState(appStateCopy);
            setTodosLoadingState((prev) => ({ ...prev, [todoState.id]: false }));
        });
    };

    const deleteTodoState = (id: number) => {
        setTodosLoadingState((prev) => ({ ...prev, [id]: true }));
        axios.delete<Todo>(`${url}/todos/${id}`).then(() => {
            console.count('axios delete');
            setTodosState((prev) => prev.filter((obj) => obj.id !== id));
            setTodosLoadingState((prev) => ({ ...prev, [id]: false }));
        });
    };

    const inputTodoState = (id: number) => {
        console.count(`todo created`);
        const request = { todo: 'New task', status: 'incomplete', category_id: id };
        axios.post<Todo, { data: { message: string; todo: Todo } }>(`${url}/todos`, request).then((response) => {
            console.count('axios post todoInput');
            setTodosState((prev) => {
                return [...prev, response.data.todo];
            });
        });
    };

    const updateCategoryState = (id: number, description: string) => {
        console.count('category updated');
        setCategoryLoadingState(true);
        const categoryStateCopy = [...categoryState];
        axios.put<Category>(`${url}/categories/${id}`, { description: description }).then(() => {
            console.count('axios put changed category');
            categoryStateCopy[categoryStateCopy.findIndex((obj) => obj.id === id)] = {
                id: id,
                description: description
            };
            setCategoryLoadingState(false);
            setCategoryState(categoryStateCopy);
        });
    };

    const deleteCategoryState = (id: number) => {
        console.count('category deleted');
        setCategoryLoadingState(true);
        axios.delete<Category>(`${url}/categories/${id}`).then(() => {
            console.count('axios delete category');
            setCategoryLoadingState(false);
            setCategoryState((prev) => prev.filter((obj) => obj.id !== id));
        });
    };

    const inputCategoryState = () => {
        console.count('category created');
        const request = { description: 'New Category' };
        axios
            .post<Category, { data: { message: string; category: Category } }>(`${url}/categories`, request)
            .then((response) => {
                console.count('axios category created');
                setCategoryState((prev) => {
                    return [...prev, response.data.category];
                });
            });
    };

    useEffect(() => {
        handleFetch();
    }, []);

    useEffect(() => {
        console.count('State Changed!!!');
    }, [todosState]);

    return (
        // the Provider gives access to the context to its children
        <AppStateContext.Provider
            value={{
                categoryState,
                categoryLoadingState,
                todosState,
                todosLoadingState,
                deleteTodoState,
                updateTodoState,
                inputTodoState,
                updateCategoryState,
                deleteCategoryState,
                inputCategoryState
            }}>
            {children}
        </AppStateContext.Provider>
    );
};

export { AppStateContext, AppStateContextProvider };

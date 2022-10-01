export interface Category {
    id: number;
    description: string;
}

export interface Todo {
    id: number;
    status: string;
    todo?: string;
    category_id: number;
}

export interface TodosLoadingState {
    [key: number]: boolean;
}

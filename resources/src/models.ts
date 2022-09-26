export interface Todo {
    id: number;
    status: string;
    todo?: string;
}

export interface TodosLoadingState {
    [key: number]: boolean;
}

export interface Todo {
    id: number;
    status: string;
    todo?: string;
}

export interface AppLoadingState {
    [key: number]: boolean;
}

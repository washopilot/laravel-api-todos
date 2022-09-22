export interface Todo {
    id: number;
    status: string;
    todo?: string;
}

export interface TodoState extends Todo {
    isLoading?: boolean;
}

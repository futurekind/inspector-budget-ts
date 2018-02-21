export interface Account {
    id: string;
    name: string;
    balance: number;
    createdAt: string;
    updatedAt: string;
}

export interface State {
    results: string[];
    entities: {
        [id: string]: Account;
    };
}

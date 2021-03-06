export interface Transaction {
    id: string;
    date: string;
    payeeId?: string;
    categoryId: string;
    accountId: string;
    text?: string;
    volume: number;
    cleared: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface State {
    results: string[];
    entities: {
        [id: string]: Transaction;
    };
}

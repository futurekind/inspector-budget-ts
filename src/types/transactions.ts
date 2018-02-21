export interface Transaction {
    id: string;
    date: string;
    payeeId?: string;
    categoryId: string;
    text?: string;
    volume: number;
    cleared: boolean;
}

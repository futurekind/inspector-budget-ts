export interface Category {
    id: string;
    label: string;
    parent: string | null;
}

export interface State {
    results: string[];
    entities: {
        [id: string]: Category;
    };
}

export enum Direction {
    ASC = 1,
    DESC = -1,
}

export const makeSortEntitiesBy = (
    entities: {
        [id: string]: {};
    },
    field: string,
    direction: Direction = 1
) => (a: string, b: string): Direction => {
    const valA = entities[a][field];
    const valB = entities[b][field];
    if (valA > valB) {
        return direction;
    }

    return direction * -1;
};

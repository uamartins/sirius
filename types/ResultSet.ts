export interface ResultSetInterface<T> {
    current_page: number,
    data: T[],
    per_page: number,
    total: number
}

export class ResultSet<T> implements ResultSetInterface<T> {
    current_page: number = 1 
    data: T[] = []
    per_page: number = 5
    total: number = 0
}

export const emptyResultSet: ResultSetInterface<any> = {
    current_page: 0,
    data: [],
    per_page: 0,
    total: 0
}

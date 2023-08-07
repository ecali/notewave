export interface BaseResponse {
    page:number,
    perPage: number,
    totalItems: number,
    totalPages: number,
    items: <T>() => any
}

export enum Method {
    get = 'GET'
}

export interface PocketBaseList {
    id: string,
    allUSer: boolean,
    deletable: boolean,
    label: string,
    icon: string
}

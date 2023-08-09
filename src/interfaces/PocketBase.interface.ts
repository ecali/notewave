export interface BaseResponse {
    page:number,
    perPage: number,
    totalItems: number,
    totalPages: number,
    items: <T>() => any
}

export enum Method {
    get = 'GET',
    post = 'POST',
    delete = 'DELETE'
}

export interface PocketBaseList {
    id: string,
    allUSer: boolean,
    deletable: boolean,
    label: string,
    icon: string
}
export interface PocketBaseNote {
    body: string,
    created: string,
    id: string,
    tag: string,
    title: string,
    updated: string,
    list: string[]
}


export interface RoutesInterface {
    path: string,
    protected: boolean;
    id: RoutesName;
    component?: any,
    navbar: boolean
}

export enum RoutesName {
    LOGIN,
    NOT_FOUND,
    DASHBOARD,
    USER
}

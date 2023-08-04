import { Component, JSX } from 'react';

export interface RoutesInterface {
    path: string,
    protected: boolean;
    id: RoutesName;
    component?: any
}

export enum RoutesName {
    LOGIN,
    NOT_FOUND
}

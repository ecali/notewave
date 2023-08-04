import { RoutesInterface, RoutesName } from '../interfaces/Routes.interface';
import { LoginPage } from '../pages/Login';

const routes: RoutesInterface[] = [
    {
        id: RoutesName.NOT_FOUND,
        path: '*',
        protected: false,
    },{
        id: RoutesName.LOGIN,
        path: '/login',
        protected: false,
        component: LoginPage
    },
];

export const getAllRoutes = () => {
    return routes;
}

export const getRoute = (id: RoutesName) => {
    return routes.find(route => route.id === id) ?? routes[0];
}

export const getRoutePath = (id: RoutesName) => {
    return getRoute(id).path;
}

import { RoutesInterface, RoutesName } from '../interfaces/Routes.interface';
import { LoginPage } from '../pages/Login';
import { DashboardPage } from '../pages/Dashboard';

const routes: RoutesInterface[] = [
    {
        id: RoutesName.NOT_FOUND,
        path: '*',
        protected: false,
        navbar: true
    }, {
        id: RoutesName.LOGIN,
        path: '/login',
        protected: false,
        component: LoginPage,
        navbar: true
    }, {
        id: RoutesName.DASHBOARD,
        path: '/dashboard',
        protected: true,
        component: DashboardPage,
        navbar: false
    }, {
        id: RoutesName.USER,
        path: '/user',
        protected: true,
        component: DashboardPage,
        navbar: false
    }
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

export const isVisibleNavBar = (path: string) => {
    return getAllRoutes().find(route => route.path === path)?.navbar ?? true;
}

import { auth } from '../config/firebase';
import { Navigate } from 'react-router-dom';
import { getRoutePath } from '../utils/Routes';
import { RoutesName } from '../interfaces/Routes.interface';

export const AuthRoute = (props: any) => {
    const {children} = props;
    if(!auth.currentUser){
        return <Navigate to={getRoutePath(RoutesName.LOGIN)} />;
    }
    return <div>{children}</div>
}

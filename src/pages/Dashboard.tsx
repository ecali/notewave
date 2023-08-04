import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { getRoutePath } from '../utils/Routes';
import { RoutesName } from '../interfaces/Routes.interface';
import { useEffect } from 'react';

export const DashboardPage = () => {
    const navigate = useNavigate();
    const logOut = () => {
        auth.signOut().then( _ => navigate(getRoutePath(RoutesName.LOGIN)));
    }
    useEffect(() => {
        console.log(auth.currentUser?.displayName)
    }, [])

    return(
        <div>
            <h3>Dashboard Page</h3>
            <button onClick={logOut}>LOGOUT</button>
        </div>
    );
}

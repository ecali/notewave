import  { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { getRoutePath } from '../utils/Routes';
import { RoutesName } from '../interfaces/Routes.interface';
import { useEffect, useState } from 'react';
import { Hello } from '../components/dashboard/Hello';
import firebase from 'firebase/compat/app';
import { Search } from '../components/dashboard/Search';


export const DashboardPage = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<firebase.User>();
    const [search, setSearch] = useState('');
    const logOut = () => {
        auth.signOut().then( _ => navigate(getRoutePath(RoutesName.LOGIN)));
    }
    useEffect(() => {
        console.log(auth.currentUser)
        if(auth.currentUser !== null){
            setCurrentUser(auth.currentUser);
        }
    }, []);

    const handleSearch = (value: string) => {
        setSearch(value);
    }

    return(
        <div className='flex flex-row text-silver bg-eerie-black h-screen w-full -m-4'>
            <div className='flex flex-col w-1/4 bg-jet h-full px-2'>
                <div className='flex flex-row justify-between my-4 items-center '>
                    <Hello displayName={currentUser?.displayName} image={currentUser?.photoURL} />
                </div>
                <Search search={search} setSearch={handleSearch} />
                <h3>Dashboard Page</h3>
                <button onClick={logOut}>LOGOUT</button>
            </div>
            <div className='flex flex-col w-1/4 border-r-silver border-r-2'></div>
            <div className='flex flex-col w-2/4'></div>
        </div>
    );
}

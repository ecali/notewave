import  { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { getRoutePath } from '../utils/Routes';
import { RoutesName } from '../interfaces/Routes.interface';
import { useEffect, useState } from 'react';
import { Hello } from '../components/dashboard/Hello';
import firebase from 'firebase/compat/app';
import { Search } from '../components/dashboard/Search';
import { CustomButton } from '../components/UI/CustomButton';
import { ArrowRightOnRectangleIcon, PlusIcon } from '@heroicons/react/24/outline';


export const DashboardPage = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<firebase.User>();
    const [search, setSearch] = useState('');
    const [dark, setDark] = useState(false);
    const logOut = () => {
        auth.signOut().then( _ => navigate(getRoutePath(RoutesName.LOGIN)));
    }
    useEffect(() => {
        console.log(auth.currentUser)
        if(auth.currentUser !== null){
            setCurrentUser(auth.currentUser);
        }
    }, []);

    const handleTheme = () => {
        setDark(!dark);
    }

    const handleSearch = (value: string) => {
        setSearch(value);
    }
    const handleNewList = () => {
        console.log('New List');
    }

    return(
        <div className='flex flex-row text-silver bg-eerie-black h-screen w-full -m-4'>
            <div className='flex flex-col w-1/4 bg-jet h-full px-2'>
                <div className='h-1/4'>
                    <div className='flex flex-row justify-between mt-4  mb-8 items-center '>
                        <Hello displayName={currentUser?.displayName} image={currentUser?.photoURL} />
                    </div>
                    <div className='mt-4  mb-8'>
                        <Search search={search} setSearch={handleSearch} />
                    </div>
                </div>
                <div className='h-3/4'>

                </div>
                <div className='h-1/6'>
                    <CustomButton callBack={handleNewList} icon={<PlusIcon className="h-6 w-6 mr-4" />} label={'New List'} />
                    <div className='flex flex-row justify-between items-center my-4'>
                        Light {dark ? 'off' : 'on'}
                        <label className="relative inline-flex items-center ">
                            <input type="checkbox" value="" className="sr-only peer" checked={dark} />
                            <div onClick={handleTheme} className="w-11 cursor-pointer bg-eerie-black h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:after:bg-silver after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-silver after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                        </label>
                    </div>
                    <div className='flex flex-row justify-end'>
                        <div className='w-1/2 mb-4'>
                            <CustomButton callBack={logOut} icon={<ArrowRightOnRectangleIcon className='h-6 w-6 mr-4' />} small={true} label='LOGOUT' background='bg-red' textColor='text-eerie-black' endIcon={true} />
                        </div>
                    </div>

                </div>
            </div>
            <div className='flex flex-col w-1/4 border-r-silver border-r-2'></div>
            <div className='flex flex-col w-2/4'></div>
        </div>
    );
}

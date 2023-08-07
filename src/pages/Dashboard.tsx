import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { getRoutePath } from '../utils/Routes';
import { RoutesName } from '../interfaces/Routes.interface';
import { useEffect, useState } from 'react';
import { Hello } from '../components/dashboard/Hello';
import firebase from 'firebase/compat/app';
import { Search } from '../components/dashboard/Search';
import { CustomButton } from '../components/UI/CustomButton';
import { ListsColumn } from '../components/dashboard/ListsColumn';
import { Method, PocketBaseList } from '../interfaces/PocketBase.interface';
import { useAxios } from '../hooks/useAxios';
import { Endpoint } from '../interfaces/endpoint.enum';
import { CircleLoader } from '../components/UI/CircleLoader';
import { CustomInputIcon } from '../components/UI/CustomInputIcon';
import { IconName } from '../interfaces/IconName.enum';

export const DashboardPage = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<firebase.User>();
    const [search, setSearch] = useState('');
    const [dark, setDark] = useState(false);
    const [selected, setSelected] = useState<PocketBaseList>();
    const [dataLists , errorList, loadingList, fetchDataList] = useAxios({method: Method.get, url: Endpoint.list});
    const [dataNotes, errorsNotes, loadingNotes, fetchDataNotes] = useAxios({method: Method.get, url: Endpoint.notes})
    const [lists, setLists] = useState<PocketBaseList[]>([]);
    const [filter, setFilter] = useState('');

    const logOut = () => {
        auth.signOut().then( _ => navigate(getRoutePath(RoutesName.LOGIN)));
    }
    useEffect(() => {
        if(auth.currentUser !== null){
            setCurrentUser(auth.currentUser);
            fetchDataList();
            fetchDataNotes();
        }
    }, []);

    useEffect(() => {
        setLists(dataLists?.items);
        setSelected(dataLists?.items[0]);
    }, [dataLists?.items])

    useEffect(() => {
        console.log(dataNotes?.items)
    }, [dataNotes?.items])

    const handleTheme = () => {
        setDark(!dark);
    }
    const handleSearch = (value: string) => {
        setSearch(value);
    }
    const handleNewList = () => {
        console.log('New List');
    }
    const handleNewNote = () => {
        console.log('New Note');
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
                    {loadingList && (
                        <div className="h-full w-full flex flex-col items-center justify-center">
                            <CircleLoader/>
                        </div>
                    )}
                    {errorList && (<p>{errorList}</p>)}
                    {
                        lists && selected ? <ListsColumn lists={lists} filterString={search} selected={selected} setSelected={setSelected} /> : ''
                    }

                </div>
                <div className='h-1/6'>
                    <CustomButton callBack={handleNewList} icon={IconName.plus} label={'New List'} />
                    <div className='flex flex-row justify-between items-center my-4'>
                        Light {dark ? 'off' : 'on'}
                        <label className="relative inline-flex items-center ">
                            <input onChange={handleTheme} type="checkbox" value="" className="sr-only peer" checked={dark} />
                            <div className="w-11 cursor-pointer bg-eerie-black h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:after:bg-silver after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-silver after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                        </label>
                    </div>
                    <div className='flex flex-row justify-end'>
                        <div className='w-1/2 mb-4'>
                            <CustomButton callBack={logOut} icon={IconName.arrowRightOnRectangleIcon} small={true} label='LOGOUT' background='bg-red' textColor='text-eerie-black' endIcon={true} />
                        </div>
                    </div>

                </div>
            </div>
            <div className='flex flex-col w-1/4 border-r-silver border-r-2 py-3 px-4'>
                <div className='flex justify-between items-center'>
                    {selected && <p className='text-silver text-2xl'>{selected?.label}</p>}
                    <div className='w-1/3'>
                        <CustomButton callBack={handleNewNote} icon={IconName.plus} label={'New note'} background='bg-jet' />
                    </div>
                </div>
                <CustomInputIcon input={filter} handleInput={setFilter} icon={IconName.funnel} clearIcon={IconName.xCircle} customBackGround='bg-jet' placeHolder='Filter' />
            </div>
            <div className='flex flex-col w-2/4'></div>
        </div>
    );
}

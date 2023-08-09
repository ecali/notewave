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
import { Method, PocketBaseList, PocketBaseNote } from '../interfaces/PocketBase.interface';
import { useAxios } from '../hooks/useAxios';
import { Endpoint } from '../interfaces/endpoint.enum';
import { CircleLoader } from '../components/UI/CircleLoader';
import { CustomInputIcon } from '../components/UI/CustomInputIcon';
import { IconName } from '../interfaces/IconName.enum';
import { NoteColumn } from '../components/dashboard/NoteColumn';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CustomIcon, getIconForNewList } from '../components/UI/CustomIcon';

export const DashboardPage = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<firebase.User>();
    const [search, setSearch] = useState('');
    const [dark, setDark] = useState(false);
    const [selected, setSelected] = useState<PocketBaseList>();
    const [lists, setLists] = useState<PocketBaseList[]>([]);
    const [filter, setFilter] = useState('');
    const [notes, setNotes] = useState<PocketBaseNote[]>([]);
    const [selectedNote, setSelectedNote] = useState<PocketBaseNote >();
    const [createNote, setCreateNote] = useState(false);
    const [createList, setCreateLis] = useState(false);
    const [newList, setNewList] = useState('');
    const [newListIcon, setNewListIcon] = useState<IconName>(IconName.chevronDown);
    const [iconToggle, setIconToggle] = useState(false);
    const [dataLists , errorList, loadingList, fetchDataList] = useAxios({method: Method.get, url: Endpoint.list});
    const [dataNotes, errorsNotes, loadingNotes, fetchDataNotes] = useAxios({method: Method.get, url: Endpoint.notes});
    const [deleteListId, setDeleteListId] = useState('');
    const [dataNewList, errorNewList, loadingNewList, fetchDataNewList] = useAxios({method: Method.post, url: Endpoint.list, data: {
            "label": newList,
            "icon": newListIcon,
            "deletable": true,
            "allUsers": false,
            "userId": auth.currentUser?.uid
        }});
    const [dataDeleteList, errorDeleteList, loadingDeleteList, fetchDataDeleteList] = useAxios({method: Method.delete, url: Endpoint.list + '/' + deleteListId});

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
        setSelectedNote(undefined);
    }, [dataLists?.items]);

    useEffect(() => {
        setNotes(dataNotes?.items);
    }, [dataNotes?.items]);

    const handleTheme = () => {
        setDark(!dark);
    }
    const handleSearch = (value: string) => {
        setSearch(value);
    }
    const handleNewList = (create?: boolean) => {
        if(!createNote) setCreateLis(true);
        if(create){
            fetchDataNewList().then(_ => {
                setCreateLis(false);
                setNewList('');
                setNewListIcon(IconName.chevronDown);
                setIconToggle(false);
                fetchDataList();
            });
        }
    }

    useEffect(() => {
        if(deleteListId !== '')
        fetchDataDeleteList().finally(() => {
            fetchDataList();
            setDeleteListId('');
        });
    }, [deleteListId])

    const handleDeleteList = (id: string) => {
        if(id !== '') setDeleteListId(id);
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
                    {createList  && (
                        <div className='flex flex-col p-2'>

                            <div className='flex flex-row justify-between mx-4'>
                                <p>Create new list</p>
                                <XMarkIcon onClick={() => setCreateLis(false)} className='h-6 cursor-pointer'/>
                            </div>
                            <div className='flex flex-row'>
                                <button className={`w-1/6 rounded-lg h-[50px] mr-2 my-auto bg-cornflower-blue cursor-pointer`} onClick={() => setIconToggle(!iconToggle)}>
                                    <CustomIcon name={newListIcon} customClass='h-6 m-auto' />
                                </button>
                                <CustomInputIcon input={newList} handleInput={setNewList}/>
                                <button onClick={() => handleNewList(true)} className={`w-1/6 rounded-lg h-[50px] ml-2 my-auto ${newList !== '' ? 'bg-cornflower-blue cursor-pointer' : 'bg-jet border-cornflower-blue border-2 cursor-default'}`}>

                                    {loadingNewList ? <CircleLoader /> : <CustomIcon name={IconName.plus} customClass='h-6 m-auto' />}
                                </button>
                            </div>
                            <div className={`flex-wrap w-full h-[100px] overflow-y-auto ${iconToggle ? 'flex' : 'hidden'}` }>
                                {getIconForNewList().map((icon, index) => (
                                    <button className={`w-1/6 rounded-lg h-[50px] mr-2 my-auto bg-eerie-black cursor-pointer`} onClick={() => setNewListIcon(icon)} key={index}>
                                        <CustomIcon name={icon} customClass='h-6 m-auto' />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}


                    {errorList && (<p>{errorList}</p>)}
                    {lists && selected ? <ListsColumn lists={lists} filterString={search} selected={selected} setSelected={setSelected} handleDelete={handleDeleteList} /> : ''}
                </div>
                <div className='h-1/6'>
                    <CustomButton callBack={handleNewList} icon={IconName.plus} label={'New List'} disabled={createList} />
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
            <div className={`flex-col w-1/4 border-r-silver border-r-2 py-3 px-4 none ${createNote ? 'hidden' : 'flex'}`}>
                <div className='flex justify-between items-center'>
                    {selected && <p className='text-silver text-2xl'>{selected?.label}</p>}
                    <div className='w-1/2'>
                        <CustomButton callBack={handleNewNote} icon={IconName.plus} label={'New note'} background='bg-jet' />
                    </div>
                </div>
                <CustomInputIcon input={filter} handleInput={setFilter} icon={IconName.funnel} clearIcon={IconName.xCircle} customBackGround='bg-jet' placeHolder='Filter' />
                {selected && notes && <div className="w-full overflow-y-auto flex-col py-8">
                    <NoteColumn notes={notes.filter(note => note.list.includes(selected?.id ) && JSON.stringify(note).toLowerCase().includes(filter.toLowerCase()))} selected={selectedNote} setSelected={setSelectedNote} />
                </div>}
                {loadingNotes &&
                    <div className="h-full w-full flex flex-col items-center justify-center">
                        <CircleLoader/>
                    </div>
                }
                {errorsNotes && <p>{errorsNotes}</p>}
            </div>
            <div className={`flex flex-col  ${createNote ? 'w-3/4' : 'w-2/4'}`}>
            </div>
        </div>
    );
}

import { useEffect, useState } from 'react';
import { PocketBaseList } from '../../interfaces/PocketBase.interface';
import { CustomIcon } from '../UI/CustomIcon';
import { IconName } from '../../interfaces/IconName.enum';
import { ListColumnProps } from '../../interfaces/Props.interface';

export const ListsColumn = (props: ListColumnProps) => {
    const [lists, setLists] = useState<PocketBaseList[]>([]);
    const [deleteId, setDeleteId] = useState('');

    const handleDeleteId = (id: string) => {
        if(props.handleDelete) {
            props.handleDelete(id);
            setDeleteId('');
        }
    }

    useEffect(() => {
        setLists(props.lists);
    }, [props.lists]);

    return (
        <>
            {lists && (
                <div className="h-full w-full overflow-y-auto flex flex-col">
                    {lists.filter(list => list.label.toLowerCase().includes(props.filterString.toLowerCase())).map(list => (
                        <div className='flex flex-col pl-2 my-1.5' key={list.id}>
                            <div className={`flex flex-row items-start  justify-between items-center h-[50px] cursor-pointer w-full rounded-lg text-silver
                        ${props.selected.id === list.id ? 'bg-cornflower-blue' : 'hover:bg-eerie-black '}`}
                            >
                                <div className="flex flex-row w-full" onClick={() => props.setSelected(list)}>
                                    {list.icon &&
                                        (<div className="h-6 w-6">
                                            <CustomIcon name={list.icon as IconName}/>
                                        </div>)
                                    } {list.label}
                                </div>
                                {(list.deletable) && <div className="h-6 w-1/6 z-20 flex " onClick={() => setDeleteId(deleteId === '' ? list.id : '') }>
                                    <CustomIcon name={IconName.ellipsisHorizontal}/>
                                </div>}
                            </div>
                            {list.id === deleteId && <div className="flex flex-row justify-between items-center">
                                <p> <strong>{list.label}</strong> will be deleted, are you sure?</p>
                                <div className="flex flex-row items-center h-full">
                                    <p className="underline text-cornflower-blue mx-2 cursor-pointer"
                                       onClick={() => handleDeleteId(list.id)}>YES</p>
                                    <p className="underline text-cornflower-blue mx-2 cursor-pointer"
                                       onClick={() => setDeleteId('')}>NO</p>
                                </div>
                            </div>}
                        </div>

                    ))}
                </div>

            )}
        </>
    );
}

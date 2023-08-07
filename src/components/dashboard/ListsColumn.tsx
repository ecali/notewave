import { useEffect, useState } from 'react';
import { PocketBaseList } from '../../interfaces/PocketBase.interface';
import { CustomIcon } from '../UI/CustomIcon';
import { IconName } from '../../interfaces/IconName.enum';
import { ListColumnProps } from '../../interfaces/Props.interface';

export const ListsColumn = (props: ListColumnProps) => {
    const [lists, setLists] = useState<PocketBaseList[]>([]);

    useEffect(() => {
        setLists(props.lists);
    }, [props.lists]);

    return (
        <>
            {lists && (
                <div className="h-full w-full overflow-y-auto flex flex-col">
                    {lists.filter(list => list.label.toLowerCase().includes(props.filterString.toLowerCase())).map(list => (<div onClick={() => props.setSelected(list)}
                        className={`flex flex-row items-start pl-2 justify-start items-center h-[50px] cursor-pointer w-full  rounded-lg  my-1.5 text-silver
                        ${props.selected.id === list.id ? 'bg-cornflower-blue' : 'hover:bg-eerie-black '}`}
                        key={list.id}> {list.icon &&
                        (<div className='h-6 w-6'>
                            <CustomIcon name={list.icon as IconName}/>
                        </div>)
                    } {list.label}</div>))}
                </div>
            )}
        </>
    );
}

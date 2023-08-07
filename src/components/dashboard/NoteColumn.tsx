import { NoteColumnProps } from '../../interfaces/Props.interface';
import Moment from 'react-moment';

export const NoteColumn = (props: NoteColumnProps) => {
    return (
        <>
            {props.notes.map(note => (
                <div key={note.id} onClick={() => props.setSelected(note)}
                     className={`cursor-pointer rounded-lg text-silver flex flex-col w-full px-3 py-4 mb-4 ${props.selected?.id === note.id ? 'border-charcoal border-2' : 'bg-jet'}`}>
                    <Moment format="MMM DD" date={note.updated} className="mb-4 text-sm"></Moment>
                    <p className="text-2xl font-bold mb-3">{note.title}</p>
                    <p className="truncate mb-3 max-h-[20px]" dangerouslySetInnerHTML={{__html: note.body}}></p>
                    <div className="flex flex-row overflow-x-auto">
                        {note.tag.split(',').map((t, index) => (
                            <div key={index}
                                 className="mx-2 px-2 text-cornflower-blue rounded-md border-2 bg-charcoal ">{t}</div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
}

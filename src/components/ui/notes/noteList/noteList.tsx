import {useSelector} from 'react-redux';
import {RootState} from "src/store/store";
import {NoteItem} from "src/components/ui/notes/noteList/noteItem/noteItem";
import {FC, memo} from "react";
import {Note} from "src/types/interface";

interface INoteList{
    selectNote:(note:Note)=>void
}

export const NoteList: FC<INoteList> = memo(({selectNote}) => {
    const filteredNotes = useSelector((state: RootState) => state.notes.filteredNotes);

    return (
        <div style={{display:'flex', justifyContent:'flex-start', gap:'30px', marginTop:'20px', flexWrap:'wrap'}}>
            {filteredNotes.map((note) => (
                <NoteItem key={note.id} note={note} selectNote={selectNote}/>
            ))}
        </div>
    );
});
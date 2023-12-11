import {NoteItem} from "src/components/ui/notes/noteList/noteItem/noteItem";
import {FC, memo} from "react";
import {Note} from "src/types/interface";
import {useTypedSelector} from "src/hooks/useTypedSelector";

interface INoteList{
    selectNote:(note:Note)=>void
}

export const NoteList: FC<INoteList> = memo(({selectNote}) => {
    const filteredNotes = useTypedSelector((state) => state.notes.filteredNotes);

    return (
        <div style={{display:'flex', justifyContent:'flex-start', gap:'30px', marginTop:'20px', flexWrap:'wrap'}}>
            {filteredNotes.map((note) => (
                <NoteItem key={note.id} note={note} selectNote={selectNote}/>
            ))}
        </div>
    );
});
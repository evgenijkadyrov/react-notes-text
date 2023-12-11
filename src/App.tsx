import React, {FC, useEffect, useState} from 'react';
import {Button} from 'antd';
import {useSelector} from 'react-redux';
import {changeCreateMode,} from 'src/store/notesSlice';
import {ModalNote} from "src/components/modal/ModalNote";
import {NoteList} from "src/components/ui/notes/noteList/noteList";
import {RootState, useAppDispatch} from "src/store/store";
import {PlusOutlined} from "@ant-design/icons";
import {Note} from "src/types/interface";
import {SearchModule} from "src/components/search/searchModule";
import {fetchNote} from "src/store/NoteActions";


export const App: FC = React.memo(() => {

    const [noteData, setNoteData] = useState<Note>();
    const dispatch = useAppDispatch();

    const editMode = useSelector((state: RootState) => state.notes.editMode);
    const createMode = useSelector((state: RootState) => state.notes.createMode);

    useEffect(() => {
        dispatch(fetchNote());
    }, []);

    const handleModalBtn = () => {
        dispatch(changeCreateMode(true))
    }
    const handleSelectNote = (note: Note) => {
        setNoteData(note)

    }
    return (
        <div style={{width: '80%', margin: '0 auto'}}>
            <h1>React Notes App</h1>
            <Button type="primary" onClick={handleModalBtn}>
                <PlusOutlined/>
                Add Note
            </Button>
            <SearchModule/>
            {createMode && <ModalNote/>}
            {editMode && <ModalNote note={noteData}/>}
            <NoteList selectNote={handleSelectNote}/>
        </div>)
})
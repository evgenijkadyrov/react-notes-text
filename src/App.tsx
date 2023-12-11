import React, {FC, useEffect, useState} from 'react';
import {Button} from 'antd';
import {ModalNote} from "src/components/modal/ModalNote";
import {NoteList} from "src/components/ui/notes/noteList/noteList";
import {PlusOutlined} from "@ant-design/icons";
import {Note} from "src/types/interface";
import {SearchModule} from "src/components/search/searchModule";
import {useActions} from "src/store/hooks/useActions";
import {useTypedSelector} from "src/hooks/useTypedSelector";


export const App: FC = React.memo(() => {

    const [noteData, setNoteData] = useState<Note>();
    const {fetchNote,changeCreateMode} = useActions();

    const editMode = useTypedSelector((state) => state.notes.editMode);
    const createMode = useTypedSelector((state) => state.notes.createMode);

    useEffect(() => {
        fetchNote();
    }, []);

    const handleModalBtn = () => {
        changeCreateMode(true)
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
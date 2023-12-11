import React, {FC, useCallback} from 'react';
import {Card, Popconfirm} from "antd";
import {changeEditMode} from "src/store/notesSlice";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Note} from "src/types/interface";
import {useAppDispatch} from "src/store/store";
import {deleteNote} from "src/store/NoteActions";

interface INoteItem  {
    note: Note,
    selectNote: (note: Note) => void
}
export const NoteItem: FC<INoteItem> = React.memo(({note, selectNote}) => {

    const dispatch = useAppDispatch();

    const handleDeleteNote = useCallback((id: string) => {
        dispatch(deleteNote(id));
    }, [dispatch])

    const handleEditClick = useCallback((note: Note) => {
        selectNote(note)
        dispatch(changeEditMode(true))
    },[dispatch])

    return (

        <div style={{minWidth: '350px', margin: '10px'}}>
            <Card title={<div style={{fontWeight:'bold', fontStyle:'italic', fontSize:'18px'}}>{note.title}</div>} bordered={false} >
                <div style={{
                    display: "flex",
                    justifyContent: 'space-between'
                }}>
                    <span style={{fontWeight: 'bold'}}>Notion: </span>

                </div>

                {note.content ? note.content : "The note doesn't contain any content. "}
            </Card>
            <Card bordered={false}  actions={[
                <EditOutlined onClick={() => handleEditClick(note)}/>,

                <Popconfirm title={'Delete notice'}
                            description="Are you sure want to delete this notice?"
                            onConfirm={() => handleDeleteNote(note.id)}
                            onCancel={() => handleDeleteNote('note.id')}
                            okText="Yes"
                            cancelText="No"
                            icon={<DeleteOutlined/>}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <DeleteOutlined style={{color: 'red'}}/>
                    </div>
                </Popconfirm>,
            ]}>
                <span style={{fontWeight: 'bold'}}>tags: </span>
                {note.tags.map(tag => <span key={tag} style={{
                    backgroundColor: '#ccccea',
                    borderRadius: '5px',
                    marginRight: '10px',
                    padding: '3px'
                }}>{tag + ' '}</span>)}

            </Card>
        </div>

    );
});


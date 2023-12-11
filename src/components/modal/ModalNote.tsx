import React, {FC, memo} from 'react';
import {Modal} from 'antd';
import {Note} from "src/types/interface";
import {FormItemCommon} from "src/components/form/formNoteCommon";
import {changeCreateMode, changeEditMode} from "src/store/notesSlice";
import {useAppDispatch} from "src/store/store";

interface ModalPropsType {
    note?: Note,
}

export const ModalNote: FC<ModalPropsType> = memo(({note,}) => {
    const dispatch = useAppDispatch()

    const handleCloseModal = () => {
        dispatch(changeCreateMode(false))
        dispatch(changeEditMode(false))
    }

    return (
        <Modal
            title="Notion"
            open={true}
            okButtonProps={{style: {display: 'none'}}}
            cancelButtonProps={{style: {display: 'none'}}}
            onCancel={handleCloseModal}
        >
            <FormItemCommon note={note}/>
        </Modal>

    );
});
import React, {FC, memo} from 'react';
import {Modal} from 'antd';
import {Note} from "src/types/interface";
import {FormItemCommon} from "src/components/form/formNoteCommon";
import {useActions} from "src/store/hooks/useActions";

interface ModalPropsType {
    note?: Note,
}

export const ModalNote: FC<ModalPropsType> = memo(({note,}) => {
    const {changeCreateMode,changeEditMode} = useActions()

    const handleCloseModal = () => {
        changeCreateMode(false)
        changeEditMode(false)
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
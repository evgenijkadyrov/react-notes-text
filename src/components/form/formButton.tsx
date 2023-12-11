import {IFormInput, Note} from "src/types/interface";
import React, {FC} from "react";
import {Button} from "antd";
import {DeepRequired, FieldErrorsImpl, GlobalError} from "react-hook-form";

interface IFormButton{
    errors: Partial<FieldErrorsImpl<DeepRequired<IFormInput>>> & {root?: Record<string, GlobalError> & GlobalError}
    note?:Note
    handleCancelBtn:()=>void
}
export const FormButton:FC<IFormButton>=({errors, note,handleCancelBtn})=>{
    return(
        <div style={{display: 'flex', justifyContent: 'flex-end', margin: '10px 0'}}>
            <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}
                    disabled={!!errors.content || !!errors.title}>
                {note ? 'Save' : 'Create'}
            </Button>
            <Button type="primary" htmlType="reset" onClick={handleCancelBtn}>
                Cancel
            </Button>
        </div>
    )
}
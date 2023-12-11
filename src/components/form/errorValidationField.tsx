import React, {FC} from 'react';

interface IErrorValidationField {
    message: string
}

export const ErrorValidationField: FC<IErrorValidationField> = ({message}) => {
    return (
        <div style={{color: 'red'}}>{message} </div>
    )
};


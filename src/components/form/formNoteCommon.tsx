import React, {FC, memo} from 'react';
import {Controller} from "react-hook-form";
import {TagsItem} from "src/components/form/tagsItem";
import {Input} from "antd";
import {Note} from "src/types/interface";
import {useSubmitForm} from "src/hooks/useSubmitForm";
import {ContentEditableItem} from "src/components/form/contentEditable";
import {ErrorValidationField} from "src/components/form/errorValidationField";
import {FormButton} from "src/components/form/formButton";

interface IFormItemCommon {
    note?: Note
}

export const FormItemCommon: FC<IFormItemCommon> = memo(({note}) => {

    const {
        onSubmit,
        highlightMatchingTags,
        handleTagsValue,
        handleCancelBtn,
        handleSubmit,
        control,
        errors,
        inputValue,
        setInputValue
    } = useSubmitForm(note)

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="title"
                control={control}
                rules={{required: true}}
                render={({field}) => <Input defaultValue={note?.title}
                                            placeholder="Title" {...field}
                                            style={{marginBottom: '5px'}}/>}
            />
            {errors.title && <ErrorValidationField message={'Title is required'}/>}

            <Controller name={'content'} control={control}
                        rules={{required: true, minLength: 10}}
                        render={({field}) => (
                            <ContentEditableItem note={note} inputValue={inputValue}
                                                 setInputValue={setInputValue}
                                                 field={field}
                                                 highlightMatchingTags={highlightMatchingTags}/>
                        )
                        }/>
            {errors.content &&
                <ErrorValidationField message={'Minimum length of note 10 symbols.'}/>
            }
            <TagsItem inputValue={inputValue} sentValue={handleTagsValue}/>
            <FormButton errors={errors} handleCancelBtn={handleCancelBtn} note={note}/>
        </form>

    );
});
import React, {FC, memo, useCallback, useState} from 'react';
import {v4 as uuidv4} from "uuid";
import {SubmitHandler} from "react-hook-form/dist/types";
import {changeCreateMode, changeEditMode} from "src/store/notesSlice";
import {Controller, useForm} from "react-hook-form";
import {TagsItem} from "src/components/form/tagsItem";
import {Button, Input} from "antd";
import ContentEditable from "react-contenteditable";
import {IFormInput, Note} from "src/types/interface";
import {useAppDispatch} from "src/store/store";
import {addNote, updateNote} from "src/store/NoteActions";

interface IFormItemCommon {
    note?: Note
}

export const FormItemCommon: FC<IFormItemCommon> = memo(({note}) => {
    const [inputValue, setInputValue] = useState(note?.content || '');
    const [tags, setTags] = useState<string[]>(note?.tags || []);
    const {
        handleSubmit,
        reset,
        control,
        formState: {errors}
    } = useForm<IFormInput>({
        defaultValues: {
            title: note?.title,
            content: note?.content
        }
    });
    const dispatch = useAppDispatch();


    const handleTagsValue = useCallback((value: string[]) => {
        setTags(value);
    }, []);

    const handleCancelBtn = useCallback(() => {
        dispatch(changeEditMode(false))
        dispatch(changeCreateMode(false))
        reset();
    }, [dispatch])

    const onSubmit: SubmitHandler<IFormInput> = ({
                                                     title = note?.title || '',
                                                     content
                                                 }) => {
        if (note) {
            dispatch(
                updateNote({
                    id: note.id,
                    title,
                    content: inputValue,
                    tags,
                })
            );
            dispatch(changeEditMode(false))
        } else {
            dispatch(
                addNote({
                    id: uuidv4(),
                    title,
                    content,
                    tags,
                })
            );
            dispatch(changeCreateMode(false))
        }

        reset();
        setTags([]);
        setInputValue('');

    };
    const highlightMatchingTags = (inputValue: string) => {
        const tagRegex = new RegExp(tags.join("|"), "gi");
        return inputValue.replace(tagRegex, "<span style='color: blue'>$&</span>");
    };
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
            {errors.title && <div style={{color: 'red'}}>Title is required</div>}
            <Controller name={'content'} control={control}
                        rules={{required: true, minLength: 10}}
                        render={({field}) => (
                            <ContentEditable style={{
                                border: '1px solid #D8D8D8',
                                borderRadius: '5px',
                                padding: '3px',
                                height: '75px'
                            }}
                                             defaultValue={note?.content}
                                             html={highlightMatchingTags(inputValue)}

                                             onChange={(e) => {
                                                 field.onChange(e.currentTarget.textContent);
                                                 setInputValue(e.currentTarget.textContent)
                                             }}
                                             onBlur={() => {
                                                 field.onBlur();

                                             }}/>
                        )
                        }/>
            {errors.content &&
                <div style={{color: 'red'}}>Minimum length of note 10 symbols. </div>}
            <TagsItem inputValue={inputValue} sentValue={handleTagsValue}/>
            <div style={{display: 'flex', justifyContent: 'flex-end', margin: '10px 0'}}>
                <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}
                        disabled={!!errors.content || !!errors.title}>
                    {note ? 'Save' : 'Create'}
                </Button>
                <Button type="primary" htmlType="reset" onClick={handleCancelBtn}>
                    Cancel
                </Button>
            </div>
        </form>

    );
});
import {IFormInput, Note} from "src/types/interface";
import {useCallback, useState} from "react";
import {useAppDispatch} from "src/store/store";
import {useForm} from "react-hook-form";
import {changeCreateMode, changeEditMode} from "src/store/notesSlice";
import {SubmitHandler} from "react-hook-form/dist/types";
import {addNote, updateNote} from "src/store/NoteActions";
import {v4 as uuidv4} from "uuid";

export const useSubmitForm=(note?:Note)=>{
    const [inputValue, setInputValue] = useState(note?.content || '');
    const [tags, setTags] = useState<string[]>(note?.tags || []);
    const dispatch = useAppDispatch();
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
    const highlightMatchingTags = (inputValue: string): string => {
        const tagRegex = new RegExp(tags.join("|"), "gi");
        return inputValue.replace(tagRegex, "<span style='color: blue'>$&</span>");
    };
    return {onSubmit, highlightMatchingTags, handleTagsValue,handleCancelBtn, handleSubmit, control, errors , inputValue, setInputValue}
}
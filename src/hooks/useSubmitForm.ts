import {IFormInput, Note} from "src/types/interface";
import {useCallback, useState} from "react";
import {useForm} from "react-hook-form";
import {SubmitHandler} from "react-hook-form/dist/types";
import {v4 as uuidv4} from "uuid";
import {useActions} from "src/store/hooks/useActions";

export const useSubmitForm = (note?: Note) => {
    const [inputValue, setInputValue] = useState(note?.content || '');
    const [tags, setTags] = useState<string[]>(note?.tags || []);
    const {changeCreateMode, changeEditMode, updateNote, addNote} = useActions();
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

    const handleCancelBtn = () => {
        changeEditMode(false)
        changeCreateMode(false)
        reset();
    }
    const onSubmit: SubmitHandler<IFormInput> = ({
                                                     title = note?.title || '',
                                                     content
                                                 }) => {
        if (note) {
            updateNote({
                id: note.id,
                title,
                content: inputValue,
                tags,
            });
            changeEditMode(false)
        } else {
            addNote({
                id: uuidv4(),
                title,
                content,
                tags,
            });
            changeCreateMode(false)
        }

        reset();
        setTags([]);
        setInputValue('');

    };
    const highlightMatchingTags = (inputValue: string): string => {
        const tagRegex = new RegExp(tags.join("|"), "gi");
        return inputValue.replace(tagRegex, "<span style='color: blue'>$&</span>");
    };
    return {
        onSubmit,
        highlightMatchingTags,
        handleTagsValue,
        handleCancelBtn,
        handleSubmit,
        control,
        errors,
        inputValue,
        setInputValue
    }
}
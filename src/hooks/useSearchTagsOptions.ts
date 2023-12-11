import {useEffect, useState} from "react";
import {SelectProps} from "antd";
import {useTypedSelector} from "src/hooks/useTypedSelector";

export const useSearchTagsOptions=()=>{
    const [options, setOptions] = useState<SelectProps['options']>([])
    const notes = useTypedSelector((state) => state.notes.notes);

    const compare = () => {
        let options = [];
        let arrayNew = Array.from(new Set(notes.flatMap((note) => note.tags)));
        for (let tag of arrayNew) {
            options.push({
                value: tag,
                label: tag,
            });
        }
        setOptions(options);
    };
    useEffect(() => {
        compare()
    }, [notes])
    return options
}
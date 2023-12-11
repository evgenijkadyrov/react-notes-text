import React, {FC, memo, useEffect, useState} from 'react';
import {Select} from 'antd';
import {useAppDispatch} from "src/store/store";
import {filterNotesByTags} from "src/store/notesSlice";
import {useSearchTagsOptions} from "src/hooks/useSearchTagsOptions";

export const SearchByTags: FC = memo(() => {
    const [searchTags, setSearchTags] = useState<string[]>([])

    const dispatch = useAppDispatch()
    const options = useSearchTagsOptions()

    useEffect(() => {
        dispatch(filterNotesByTags(searchTags));
    }, [dispatch, searchTags])

    return (
        <Select
            mode="tags"
            style={{width: '300px'}}
            placeholder="Tags Mode"
            onChange={setSearchTags}
            options={options}
        />)
});


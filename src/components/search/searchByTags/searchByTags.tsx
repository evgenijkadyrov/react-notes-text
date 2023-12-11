import React, {FC, memo, useEffect, useState} from 'react';
import {Select} from 'antd';
import {useSearchTagsOptions} from "src/hooks/useSearchTagsOptions";
import {useActions} from "src/store/hooks/useActions";

export const SearchByTags: FC = memo(() => {
    const [searchTags, setSearchTags] = useState<string[]>([])

    const {filterNotesByTags} = useActions()
    const options = useSearchTagsOptions()

    useEffect(() => {
        filterNotesByTags(searchTags);
    }, [searchTags])

    return (
        <Select
            mode="tags"
            style={{width: '300px'}}
            placeholder="Tags Mode"
            onChange={setSearchTags}
            options={options}
        />)
});


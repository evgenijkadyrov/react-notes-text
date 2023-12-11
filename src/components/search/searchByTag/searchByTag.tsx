import React, {FC, useEffect, useState} from 'react';
import {Input} from "antd";
import {useActions} from "src/store/hooks/useActions";

export const SearchByTag: FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const {filterNotesByTag} = useActions();
    useEffect(() => {
        filterNotesByTag(searchValue);
    }, [searchValue])
    const {Search} = Input;
    return (
        <Search
            placeholder="Filter by tag"
            onChange={(e) => setSearchValue(e.target.value)}
            style={{width: 200}}
        />
    );
};


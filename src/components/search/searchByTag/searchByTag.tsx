import React, {FC, useEffect, useState} from 'react';
import {filterNotesByTag} from "src/store/notesSlice";
import {Input} from "antd";
import {useAppDispatch} from "src/store/store";

export const SearchByTag:FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(filterNotesByTag(searchValue));
    }, [dispatch, searchValue])
    const {Search} = Input;
    return (
        <Search
            placeholder="Filter by tag"
            onChange={(e) => setSearchValue(e.target.value)}
            style={{width: 200}}
        />
    );
};


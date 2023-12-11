import React, {FC, memo} from 'react';
import Search from "antd/es/input/Search";
import {filterByTitle} from "src/store/notesSlice";
import {useAppDispatch} from "src/store/store";

export const SearchByTitle: FC =memo(() => {
    const dispatch = useAppDispatch()
    const handleFilterTitle = (value: string) => {
        dispatch(filterByTitle(value))
    }
    return (
        <Search
            placeholder="Title"
            onChange={(e) => handleFilterTitle(e.target.value)}
            style={{width: 200}}
        />
    );
}) ;


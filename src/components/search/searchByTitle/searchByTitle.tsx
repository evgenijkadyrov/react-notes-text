import React, {FC, memo} from 'react';
import Search from "antd/es/input/Search";
import {useActions} from "src/store/hooks/useActions";

export const SearchByTitle: FC = memo(() => {
    const {filterByTitle} = useActions()

    const handleFilterTitle = (value: string) => {
        filterByTitle(value)
    }
    return (
        <Search
            placeholder="Title"
            onChange={(e) => handleFilterTitle(e.target.value)}
            style={{width: 200}}
        />
    );
});


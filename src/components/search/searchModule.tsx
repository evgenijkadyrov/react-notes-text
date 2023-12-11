import React from 'react';
import {SearchByTitle} from "src/components/search/searchByTitle/searchByTitle";
import {SearchByTag} from "src/components/search/searchByTag/searchByTag";
import {SearchByTags} from "src/components/search/searchByTags/searchByTags";

export const SearchModule = () => {
    return (
        <div style={{display: "flex", justifyContent: 'center'}}>
            <SearchByTitle/>
            <SearchByTag/>
            <SearchByTags/>
        </div>
    );
};


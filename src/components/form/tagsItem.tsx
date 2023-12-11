import React, {FC, memo} from 'react';
import {useHashTags} from "src/hooks/useHashTags";

interface ITagsItemProps {
    inputValue: string;
    sentValue: (value: string[]) => void;
}

export const TagsItem: FC<ITagsItemProps> = memo(({inputValue, sentValue}) => {

    const hashTags = useHashTags(inputValue, sentValue)

    return (
            <div>
                {hashTags.map((tag, index) => (
                    <span key={index}>{`${tag}` + ' '}  </span>
                ))}
            </div>

    );
});


import {useEffect, useState} from "react";

export const useHashTags=(inputValue: string, sentValue: (value: string[]) => void): string[] => {
    const [hashTags, setHashTag] = useState<string[]>([]);
    useEffect(() => {
        const regex = /\s|[,.;!?]+/
        const words = inputValue.split(regex);

        const newHashtags = words.filter((word:string) => word.startsWith('#') && word.length > 1 && word.slice(-1).match(/[a-zA-Z0-9]+/g));

        setHashTag(newHashtags);
        sentValue(newHashtags)

    }, [inputValue])
    return hashTags
}
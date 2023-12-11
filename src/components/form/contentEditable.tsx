import {IFormInput, Note} from "src/types/interface";
import React, {FC} from "react";
import ContentEditable from "react-contenteditable";
import {ControllerRenderProps} from "react-hook-form";

interface IContentEditableItem {
    note?: Note,
    inputValue: string,
    setInputValue: (value: string) => void,
    field: ControllerRenderProps<IFormInput, "content" >,
    highlightMatchingTags: (inputValue: string) => string,

}

export const ContentEditableItem: FC<IContentEditableItem> = ({
                                                                  note,
                                                                  highlightMatchingTags,
                                                                  inputValue,
                                                                  setInputValue,
                                                                  field
                                                              }) => {

    return (
        <ContentEditable style={{
            border: '1px solid #D8D8D8',
            borderRadius: '5px',
            padding: '3px',
            height: '75px'
        }}
                         defaultValue={note?.content}
                         html={highlightMatchingTags(inputValue)}

                         onChange={(e) => {
                             field.onChange(e.currentTarget.textContent);
                             setInputValue(e.currentTarget.textContent)
                         }}
                         onBlur={() => {
                             field.onBlur();

                         }}/>
    )


}
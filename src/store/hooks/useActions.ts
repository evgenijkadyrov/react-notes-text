import {useDispatch} from "react-redux";
import {useMemo} from "react";
import {bindActionCreators} from "@reduxjs/toolkit";
import {actions} from "src/store/notesSlice";
import {addNote, deleteNote, fetchNote, updateNote} from "src/store/noteActions";

const rootActions = {
    ...actions,
    fetchNote, addNote, deleteNote, updateNote

}
export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => {
        return bindActionCreators(rootActions, dispatch)
    }, [dispatch])
}

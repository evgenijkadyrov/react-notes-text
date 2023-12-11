import { configureStore } from '@reduxjs/toolkit';
import notesReducer from 'src/store/notesSlice';
import {useDispatch} from "react-redux";

const store = configureStore({
    reducer: {
        notes: notesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export default store;

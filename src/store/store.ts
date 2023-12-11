import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {reducer as notesReducer} from 'src/store/notesSlice';

const reducers=combineReducers({
    notes:notesReducer,
})
const store = configureStore({
    reducer: reducers
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

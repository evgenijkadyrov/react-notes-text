import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NotesState} from "src/types/interface";
import {
    addNote,
    deleteNote,
    fetchNote,
    updateNote
} from "src/store/NoteActions";

const initialState: NotesState = {
    notes: [],
    filteredNotes: [],
    highlightedTag: [],
    editMode: false,
    createMode: false,
};

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        filterNotesByTag: (state, action: PayloadAction<string>) => {
            const keyword = action.payload.toLowerCase();
            if (keyword.length === 0) {
                state.filteredNotes = state.notes
            } else
                state.filteredNotes = state.notes.filter((note) =>
                    note.tags.some((tag) => tag.toLowerCase().includes(keyword))
                );
        },
        filterNotesByTags: (state, action: PayloadAction<string[]>) => {

            const keywords = action.payload.map((keyword) => keyword.toLowerCase());
            if (keywords.length === 0) {
                state.filteredNotes = state.notes
            } else
                state.filteredNotes = state.notes.filter((note) =>
                    note.tags.some((tag) =>
                        keywords.some((keyword) => tag.toLowerCase().includes(keyword))))
        },
        filterByTitle: (state, action: PayloadAction<string>) => {
            const keyword = action.payload.toLowerCase();
            state.filteredNotes = state.notes.filter((note) =>
                note.title.toLowerCase().includes(keyword)
            );
        },
        changeEditMode: (state, action: PayloadAction<boolean>) => {
            state.editMode = action.payload
        },
        changeCreateMode: (state, action: PayloadAction<boolean>) => {
            state.createMode = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNote.fulfilled, (state, action) => {
            state.notes = action.payload;
            state.filteredNotes = action.payload;
        });
        builder.addCase(addNote.fulfilled, (state, action) => {
            state.notes.unshift(action.payload);
            state.filteredNotes.unshift(action.payload);
        });
        builder.addCase(deleteNote.fulfilled, (state, action) => {
            const noteId = action.payload;
            state.notes = state.notes.filter((note) => note.id !== noteId);
            state.filteredNotes = state.notes.filter((note) => note.id !== noteId);
        });
        builder.addCase(updateNote.fulfilled, (state, action) => {
            const updatedNote = action.payload;
            state.notes = state.notes.map((note) =>
                note.id === updatedNote.id ? updatedNote : note
            );
            state.filteredNotes = state.notes.map((note) =>
                note.id === updatedNote.id ? updatedNote : note
            );
        });

    }
});
export const {
    filterNotesByTag,
    filterByTitle,
    filterNotesByTags,
    changeEditMode,
    changeCreateMode
} = notesSlice.actions;

export default notesSlice.reducer;
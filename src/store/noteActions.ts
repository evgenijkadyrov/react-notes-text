import {createAsyncThunk} from '@reduxjs/toolkit';
import db from "src/data/db";
import {Note} from "src/types/interface";

export const fetchNote = createAsyncThunk(
    'notes/fetchNotes',
    async () => {
        return await db.notes.toArray()

    }
);
export const updateNote = createAsyncThunk(
    'notes/updateNote',
    async (updatedNote: Note) => {
        await db.notes.update(updatedNote.id, updatedNote);
        return updatedNote;
    }
);

export const deleteNote = createAsyncThunk(
    'notes/deleteNote',
    async (noteId: string) => {
        await db.notes.delete(noteId);
        return noteId;
    }
);
export const addNote = createAsyncThunk(

    'notes/addNote',
    async (newNote: Note) => {
        await db.notes.add(newNote);
        return newNote;
    }
);
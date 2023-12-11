export interface IFormInput {
    title: string
    content: string
    tag: string,
    singleErrorInput: string;
}
export interface Note {
    id: string;
    title: string;
    content: string;
    tags: string[];
}

export interface NotesState {
    notes: Note[];
    filteredNotes: Note[];
    highlightedTag: string[];
    editMode: boolean,
    createMode:boolean
}
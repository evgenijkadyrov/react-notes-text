import Dexie from 'dexie';

interface Note {
    id: string;
    title: string;
    content: string;
    tags: string[];
}

class NotesDatabase extends Dexie {
    notes: Dexie.Table<Note, string>;

    constructor() {
        super('notesDB');
        this.version(1).stores({
            notes: 'id, title, content, tags',
        });
        this.notes = this.table('notes');
    }
}

const db = new NotesDatabase();

export default db;

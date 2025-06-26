import Note from '../models/Note.js';

export async function getNotes(req, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.log('Error fetching notes:', error.message);
        res.status(500).json({
            message: 'Failed to fetch notes',
        });
    }
}

export async function getNote(req, res) {
    try {
        const note = await Note.find({ _id: req.params.id });
        if (!note) {
            return res.status(404).json({
                message: `Note with ID ${req.params.id} not found`,
            });
        }
        res.status(200).json(note);
    } catch (error) {
        console.log(`Error fetching note ${req.params.id}:`, error.message);
        res.status(500).json({
            message: `Failed to fetch note ${req.params.id}`,
        });
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content });
        await note.save();
        res.status(201).json({ message: 'Note created successfully' });
    } catch (error) {
        console.log('Error creating note:', error.message);
        res.status(500).json({
            message: 'Failed to create note',
        });
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({
                message: `Note with ID ${req.params.id} not found`,
            });
        }
        res.status(200).json({
            message: 'Note updated successfully',
        });
    } catch (error) {
        console.log('Error updating note:', error.message);
        res.status(500).json({
            message: 'Failed to update note',
        });
    }
}

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({
                message: `Note with ID ${req.params.id} not found`,
            });
        }
        res.status(200).json({
            message: 'Note deleted successfully',
        });
    } catch (error) {
        console.log('Error deleting note:', error.message);
        res.status(500).json({
            message: 'Failed to delete note',
        });
    }
}
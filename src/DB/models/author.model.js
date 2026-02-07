import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nationality: { type: String, required: true }
});

export const Author = mongoose.model('Author', authorSchema);

import mongoose from 'mongoose';
import { Log } from './log.model.js';
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'], 
        trim: true, 
        minLength: [1, 'Title cannot be empty'] 
    },
    author: String,
    year: Number,
    genres: [String]
});

export const Book = mongoose.model('Book', bookSchema);


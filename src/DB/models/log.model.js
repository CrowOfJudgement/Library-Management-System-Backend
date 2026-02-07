import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    book_id: { type: String, required: true },
    action: { type: String, required: true }
}, { timestamps: true });

export const Log = mongoose.model('Log', logSchema);
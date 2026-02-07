import mongoose from 'mongoose';

export const checkConnectionDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/assignment8_db');
        console.log('Database Connected Successfully... ✅');
    } catch (error) {
        console.error('Database Connection Failed! ', error);
    }
};
import { Book } from "../DB/models/book.model.js";
import { Log } from "../DB/models/log.model.js";
export const createCollection = async () => {
    const result = await Book.createCollection(); 
    return result;
};
export const createCappedCollection = async () => {
    const result = await Book.db.createCollection("cappedBooks", {
        capped: true,
        size: 1024 * 1024, 
        max: 100 
    });
    return result;
};
export const createTitleIndex = async () => {
    const result = await Book.collection.createIndex({ title: 1 });
    return result; 
};


export const findOneBook = async (title) => {
    return await Book.findOne({ title: title });
};

export const findBooksByYearRange = async (from, to) => {
    return await Book.find({
        year: { 
            $gte: parseInt(from), 
            $lte: parseInt(to)    
        }
    });
};

export const findBooksByGenre = async (genreName) => {
    return await Book.find({ genres: genreName });
};

export const getPaginatedBooks = async () => {
    return await Book.find()
        .sort({ year: -1 }) 
        .skip(2)            
        .limit(3);         
};

export const findBooksWithIntegerYear = async () => {
    return await Book.find({
        year: { $type: "int" } 
    });
};

export const findBooksExcludingGenres = async () => {
    return await Book.find({
        genres: { $nin: ["Horror", "Science Fiction"] }
    });
};

export const deleteBooksBeforeYear = async (year) => {
    return await Book.deleteMany({
        year: { $lt: parseInt(year) } 
    });
};


export const getBooksAggregate = async () => {
    return await Book.aggregate([
        { 
            $match: { year: { $gt: 2000 } } 
        },
        { 
            $sort: { year: -1 } 
        }
    ]);
};


export const getBooksFieldsAggregate = async () => {
    return await Book.aggregate([
        { 
            $match: { year: { $gt: 2000 } } 
        },
        { 
            $project: {
                _id: 0, 
                title: 1,
                author: 1,
                year: 1
            }
        }
    ]);
};


export const unwindBooksGenres = async () => {
    return await Book.aggregate([
        { 
            $unwind: "$genres" 
        },
        { 
            $project: {
                _id: 0,
                title: 1,
                genres: 1
            }
        }
    ]);
};

export const getLogsWithBookDetails = async () => {
    return await Log.aggregate([
        {
            $lookup: {
                from: "books",        
                localField: "book_id", 
                foreignField: "_id",  
                as: "book_details"    
            }
        },
        {
            $project: {
                _id: 0,
                action: 1,
                "book_details.title": 1,
                "book_details.author": 1,
                "book_details.year": 1
            }
        }
    ]);
};
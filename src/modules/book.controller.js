import * as BookService from "./book.service.js"; 
import { Author } from "../DB/models/author.model.js";
import { Book } from "../DB/models/book.model.js";
import { Log } from "../DB/models/log.model.js";

Book
export const createExplicitCollection = async (req, res) => {
    try {
        await BookService.createCollection(); 
        
        return res.status(200).json({ 
            message: "Success! Collection created explicitly",
            status: "ok" 
        });
    } catch (error) {
        if (error.code === 48) {
            return res.status(200).json({ message: "Collection already exists" });
        }
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
    
};


export const addAuthor = async (req, res) => {
    try {
        const result = await Author.create(req.body); 
        
        return res.status(201).json({
            acknowledged: true,
            insertedId: result._id
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
export const createCapped = async (req, res) => {
    try {
        await BookService.createCappedCollection();
return res.status(200).json({ ok: 1 });
    } catch (error) {
        if (error.code === 48) {
            return res.status(200).json({ message: "Capped collection already exists!" });
        }
        return res.status(500).json({ error: error.message });
    }
};
export const createIndex = async (req, res) => {
    try {
        const indexName = await BookService.createTitleIndex();
        return res.status(200).send(indexName); 
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const addBook = async (req, res) => {
    try {
        const result = await Book.create(req.body);
        
        return res.status(201).json({
            acknowledged: true,
            insertedId: result._id
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const addBooksBatch = async (req, res) => {
    try {
        const result = await Book.insertMany(req.body);
        
        const insertedIds = {};
        result.forEach((doc, index) => {
            insertedIds[index] = doc._id;
        });

        return res.status(201).json({
            acknowledged: true,
            insertedIds: insertedIds
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



export const addLog = async (req, res) => {
    try {
        const result = await Log.create(req.body);
        
        return res.status(201).json({
            acknowledged: true,
            insertedId: result._id
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


export const updateBookYear = async (req, res) => {
    try {
        const { title } = req.params; 
        
        const result = await Book.updateOne(
            { title: title }, 
            { $set: { year: 2022 } }
        );

        return res.status(200).json({
            acknowledged: result.acknowledged,
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


export const findBookByTitle = async (req, res) => {
    try {
        const { title } = req.query; 
        
        const book = await BookService.findOneBook(title);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getBooksByYear = async (req, res) => {
    try {
        const { from, to } = req.query; 
        
        const books = await BookService.findBooksByYearRange(from, to);

        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getBooksByGenre = async (req, res) => {
    try {
        const { genre } = req.query; 
        
        const books = await BookService.findBooksByGenre(genre);

        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getSkipLimitBooks = async (req, res) => {
    try {
        const books = await BookService.getPaginatedBooks();
        
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
export const getYearIntegerBooks = async (req, res) => {
    try {
        const books = await BookService.findBooksWithIntegerYear();
        
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getExcludedGenresBooks = async (req, res) => {
    try {
        const books = await BookService.findBooksExcludingGenres();
        
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const removeOldBooks = async (req, res) => {
    try {
        const { year } = req.query; 
        
        const result = await BookService.deleteBooksBeforeYear(year);

        return res.status(200).json({
            acknowledged: result.acknowledged,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getAggregateBooks = async (req, res) => {
    try {
        const books = await BookService.getBooksAggregate();
        
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


export const getAggregateFields = async (req, res) => {
    try {
        const books = await BookService.getBooksFieldsAggregate();
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getUnwindAggregate = async (req, res) => {
    try {
        const books = await BookService.unwindBooksGenres();
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


export const getAggregateJoin = async (req, res) => {
    try {
        const result = await BookService.getLogsWithBookDetails();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
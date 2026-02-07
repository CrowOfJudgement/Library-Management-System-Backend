import express from "express";
import { checkConnectionDB } from "./DB/connectingDB.js"; 
import bookRouter from "./modules/books.routes.js";

const app = express();
const port = 3000;

const bootstrap = () => {
    app.use(express.json());

    checkConnectionDB();

    app.get("/", (req, res) => {
        res.status(200).json({ message: "Welcome to my Assignment 8 App" });
    });

    app.use(bookRouter);

   app.use((req, res) => {
        res.status(404).json({ message: "Not Found" });
    });

    app.listen(port, () => {
        console.log(`🚀 Server is running on port ${port}`);
    });
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

export default bootstrap;
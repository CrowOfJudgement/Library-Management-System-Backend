import { Router } from "express"; 
import * as BookController from "./book.controller.js";

const router = Router();

router.post("/collection/books", BookController.createExplicitCollection);
router.post("/collection/authors", BookController.addAuthor);
router.post("/collection/capped", BookController.createCapped);
router.post("/collection/books/index", BookController.createIndex);
router.post("/add/books", BookController.addBook);
router.post("/books/batch", BookController.addBooksBatch);
router.post("/logs", BookController.addLog);
router.patch("/books/:title", BookController.updateBookYear);
router.get("/books/title", BookController.findBookByTitle);
router.get("/books/year", BookController.getBooksByYear);
router.get("/books/genre", BookController.getBooksByGenre);
router.get("/books/skip-limit", BookController.getSkipLimitBooks);
router.get("/books/year-integer", BookController.getYearIntegerBooks);
router.get("/books/exclude-genres", BookController.getExcludedGenresBooks);
router.delete("/books/before-year", BookController.removeOldBooks);
router.get("/books/aggregate1", BookController.getAggregateBooks);
router.get("/books/aggregate2", BookController.getAggregateFields);
router.get("/books/aggregate3", BookController.getUnwindAggregate);
router.get("/books/aggregate4", BookController.getAggregateJoin);

export default router;
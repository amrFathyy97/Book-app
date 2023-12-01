import express from 'express';
import { createBook, deleteBook, getAllBooks, getSingleBook, updateBook } from '../controllers/book';

const router = express.Router();

router.get("/", getAllBooks);

router.get("/:id", getSingleBook);

router.post("/", createBook);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

export default router

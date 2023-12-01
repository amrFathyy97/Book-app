import express from "express";
import { authorForm, createAuthor, deleteAuthor, getAllAuthors, getSingleAuthor, updateAuthor } from "../controllers/author";
import { errorHandler } from "../middlewares/errorHandling";

const router = express.Router();


router.get("/", getAllAuthors)

router.get("/:id", getSingleAuthor)

router.post("/", createAuthor)

router.put("/:id", updateAuthor)

router.delete("/:id", deleteAuthor)


export default router
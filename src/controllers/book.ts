import validate, { IBook } from './../util/Book-Validator';

import { Request, Response, NextFunction } from "express";

import { Book } from "../Entities/Book";

import { AppDataSource } from "../data-source";

import { handlingAsyncFN } from "../middlewares/asyncHandler";

import { CustomError } from "../classes/CustomError";

import { Author } from "../Entities/Author";


AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    });



export const getAllBooks = handlingAsyncFN( async (req: Request,res: Response,next: NextFunction)=> {
    const books: IBook[] = await AppDataSource.getRepository(Book).query("SELECT * FROM book");
    if(books.length < 1) {
        const err: CustomError = new CustomError("No books found", 404, "Failure");
        return next(err)
    }
    return res.json({
        status: "success",
        data: books
    })
});

export const getSingleBook = handlingAsyncFN( async (req: Request,res: Response,next: NextFunction)=> {
    const book: IBook[] = await AppDataSource.getRepository(Book).query(`SELECT * FROM book where id = ${req.params.id}`);
    if(book.length < 1) {
        const err: CustomError = new CustomError("No books found", 404, "Failure");
        return next(err)
    }
    return res.json({
        status: "success",
        data: book
    })
});

export const createBook = handlingAsyncFN(async (req: Request, res: Response, next: NextFunction) => {
    const valid = validate(req.body);
    if(!valid) {
        const err: CustomError = new CustomError(validate.errors[0].message, 404, "Failure");
        return next(err)
    };
    const checkAuthorExists = await AppDataSource.getRepository(Author).query(`SELECT * FROM author WHERE id = ${req.body.authorId}`);
    if(checkAuthorExists.length < 1) {
        const err = new CustomError("Author not exist", 404, "Failure");
        return next(err);
    }
    const book = await AppDataSource.getRepository(Book).create({author: req.body.authorId, price: req.body.price, title: req.body.title});
    const result = await AppDataSource.getRepository(Book).save(book);
    return res.status(201).json({
        status: "success",
        data: result
    })
});

export const updateBook = handlingAsyncFN(async (req: Request, res: Response, next: NextFunction) => {
    const book: IBook[] = await AppDataSource.getRepository(Book).query(`SELECT * FROM book WHERE id = '${req.params.id}'`);
    if(book.length < 1) {
        const err: CustomError = new CustomError("Book not found", 404, "Failure");
        return next(err)
    };
    await AppDataSource.getRepository(Book).query(`UPDATE book SET title = '${req.body.title}', price = '${req.body.price}'`);
    const updatedBook = await AppDataSource.getRepository(Book).query(`SELECT * FROM book WHERE id = ${req.params.id}`);
    return res.json({
        status: "success",
        data: updatedBook
    })
});

export const deleteBook = handlingAsyncFN(async (req: Request, res: Response, next: NextFunction) => {
    const book: IBook[] = await AppDataSource.getRepository(Book).query(`SELECT * FROM book WHERE id = '${req.params.id}'`);
    if(book.length < 1) {
        const err: CustomError = new CustomError("Book not found", 404, "Failure");
        return next(err)
    }
    await AppDataSource.getRepository(Book).query(`DELETE FROM book WHERE id = '${req.params.id}'`);
    return res.json({
        status: 200,
        message: "Book deleted successfully"
    })
});


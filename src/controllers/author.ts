import Ajv, { JSONSchemaType }  from "ajv";
import { AppDataSource } from "../data-source";
import { Request, Response, NextFunction } from "express";
import { Author } from "../Entities/Author";
import { handlingAsyncFN } from "../middlewares/asyncHandler";
import { CustomError } from "../classes/CustomError";



const ajv = new Ajv();

type Auth = {
    fname: string,
    lname: string,
    nationality: string
}

const schema: JSONSchemaType<Auth> = {
    type: "object",
    properties: {
        fname: {"type": "string"},
        lname: {"type": "string"},
        nationality: {"type": "string"}
    },
    required: ["fname", "lname", "nationality"]
}

const validate = ajv.compile(schema)


AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    });


export const getAllAuthors = handlingAsyncFN(
    async (req: Request, res: Response, next: NextFunction) => {
    const authors: Auth[] = await AppDataSource.getRepository(Author).query('SELECT * FROM author');
    if(authors.length < 1) {
        const err = new CustomError("No authors found", 404, "Failure" );
        return next(err);
    }
    return res.json({
        message: "OK",
        data: authors
    })
    
})

export const getSingleAuthor = handlingAsyncFN(
    async (req: Request, res: Response, next: NextFunction) => {
    const author: Auth[] = await AppDataSource.getRepository(Author).query(`SELECT * FROM author where id = ${req.params.id}`);
    if(author.length < 1) {
        const err = new CustomError("Author not found", 404, "Failure");
        return next(err);
    }
    return res.json({
        message: "OK",
        data: author
    })})



export const createAuthor = handlingAsyncFN(
    async (req: Request,res: Response, next: NextFunction) => {
        const valid = await validate(req.body)
        if(!valid) {
            const err = await new CustomError(validate.errors[0].message, 404, "Failure");
            return next(err);
        }
        const author = await AppDataSource.getRepository(Author).create(req.body);
        const result = await AppDataSource.getRepository(Author).save(author);
        return res.status(201).json({
            status: "OK",
            data: result
        })
    }
)


export const updateAuthor = handlingAsyncFN (
    async (req: Request, res: Response, next: NextFunction) => {
        const valid = await validate(req.body)
        if(!valid) {
            const err = await new CustomError(validate.errors[0].message, 404, "Failure");
            next(err)
        }
        const author: Auth[] = await AppDataSource.getRepository(Author).query(`SELECT * FROM author where id = ${req.params.id}`);
        if(author.length < 1) {
            const err = await new CustomError("No author found", 404, "Failure");
            return next(err)
        }
        await AppDataSource.getRepository(Author).query(`update author set fname = '${req.body.fname}',
         lname = '${req.body.lname}', nationality = '${req.body.nationality}' where id = ${req.params.id}`);
        const updatedAuthor = await AppDataSource.getRepository(Author).query('SELECT * FROM author WHERE ID = ' + req.params.id);
         return res.json({
            status: 200,
            data: updatedAuthor
         })
    }
)


export const deleteAuthor = handlingAsyncFN(
    async (req: Request, res: Response, next: NextFunction) => {
        const author: Auth[] = await AppDataSource.getRepository(Author).query(`SELECT * FROM author where id = ${req.params.id}`);
        if(author.length < 1) {
            const err = new CustomError("Author not found", 404, "Failure");
            return next(err)
        }
    
        await AppDataSource.getRepository(Author).query(`DELETE FROM author WHERE id = ${req.params.id}`);
        return res.json({
            status: 200,
            message: "Author deleted successfully"
        })
    }
)
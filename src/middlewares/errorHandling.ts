import { Request, Response, NextFunction } from "express";
import { CustomError } from "../classes/CustomError";

export const errorHandler = async (err: CustomError,req: Request,res: Response,next: NextFunction) => {
    return res.status(err.status).json({
        status: err.statusMessage,
        message: err.message
    })
}
export class CustomError extends Error {
    constructor(message: string, public status: number,public statusMessage: string){
        super(message)
    }
}
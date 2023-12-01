import express from "express";

import {Response, Request , NextFunction } from "express";

import dotenv from "dotenv";

import helmet from "helmet";

dotenv.config();

import stdRouter from "./routes/student";

import authRouter from "./routes/author";

import bookRouter from "./routes/book";

import { errorHandler } from "./middlewares/errorHandling";

import path from "path";

import ejs from "ejs";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(helmet());


app.use(express.static(path.join(__dirname, "./public")));

app.set("template engine", "ejs")

app.use("/std", stdRouter);


app.use("/author",authRouter)


app.use("/book", bookRouter)

app.get("/form", (req,res) => {
    res.render("CreateAuthor.ejs")
})


app.use(errorHandler)




app.all("*", async (req: Request, res:Response) => {
    console.log("not found")
    return res.status(404).render("404.ejs")
})

// Create a web server

const main = async () => {
    try {
        await app.listen(port);
        console.log("Listening on port " + port);
    }catch(err){ 
        console.log("Failed to listen on port");
    }
};

main();


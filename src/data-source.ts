import "reflect-metadata";
import { DataSource } from "typeorm";
import { Author } from "./Entities/Author";
import { Book } from "./Entities/Book";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port:3306 ,
    username: `${process.env.MYSQL_USERNAME}`,
    password: `${process.env.MYSQL_PASSWORD}`,
    database: "book_store",
    entities: [Author, Book],
    logging: true,
    synchronize: false,
})
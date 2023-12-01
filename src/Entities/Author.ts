import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Book } from "./Book";
@Entity()
export class Author
{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    fname: string
    @Column()
    lname: string
    @Column()
    nationality: string
    @OneToMany((type)=> Book, (book)=> book.author)
    books: Book[]
}
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import { Author } from "./Author"

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title: string
    @Column()
    price: number
    @ManyToOne((type)=> Author, (author)=> author.id)
    author: Author
}
import { Entity, Column, ObjectIdColumn, ManyToOne } from 'typeorm'
import UserEntity from './user.entity'

@Entity({
    name: 'Post'
})
export default class PostEntity {
    @ObjectIdColumn()
    _id: string

    @Column()
    title: string

    @Column('text')
    des: string

    @Column()
    image: string

    @Column('int')
    like: number

    @Column('int')
    dislike: number

    @Column()
    idCreator: string

    constructor(args: Partial<string>) {
        this.des = args
        this.like = 0
        this.dislike = 0
    }
}
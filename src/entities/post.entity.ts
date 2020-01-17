import { Entity, Column, ObjectIdColumn, ManyToOne } from 'typeorm'
import UserEntity from './user.entity'

@Entity({
    name: 'Post'
})
export default class PostEntity {
    @ObjectIdColumn()
    _id: string

    @Column()
    thumnails: [string]

    @Column()
    des: string

    @Column()
    like: [UserEntity]

    @Column()
    idCreator: UserEntity

    // constructor(args: Partial<string>) {
    //     this.des = args
    // }
}
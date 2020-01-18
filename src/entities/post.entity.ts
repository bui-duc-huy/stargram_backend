import { Entity, Column, ObjectIdColumn, ManyToOne, ObjectID } from 'typeorm'
import UserEntity from './user.entity'
import CommentEntity from './comment.entity'

@Entity({
    name: 'Post'
})
export default class PostEntity {
    @ObjectIdColumn()
    _id: string

    @Column()
    thumbnails: string[]

    @Column()
    description: string

    @Column()
    likes: UserEntity[]

    @Column()
    creator: UserEntity

    @Column()
    comments: CommentEntity[]

    @Column()
    createAt: Date

    constructor() {
        this.likes = []
        this.comments= []
        this.createAt = new Date()
    }
}
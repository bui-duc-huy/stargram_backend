import { Entity, Column, ObjectIdColumn, ManyToOne, ObjectID } from 'typeorm'
import UserEntity from './user.entity'

@Entity({
    name: 'Comment'
})
export default class CommentEntity {
    @ObjectIdColumn()
    _id: string

    @Column()
    thumbnails: string

    @Column()
    description: string

    @Column()
    likes: UserEntity[]

    @Column()
    creator: string

    @Column()
    createAt: Date

    constructor() {
        this._id = this.randomid()
        this.likes = []
        this.createAt = new Date()
    }

    private randomid(){
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
        var length = 10
        if (! length) {
            length = Math.floor(Math.random() * chars.length);
        }
    
        var str = '';
        for (var i = 0; i < length; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }
}
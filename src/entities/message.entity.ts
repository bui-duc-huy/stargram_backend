import { Entity, Column, ObjectIdColumn, ManyToOne } from 'typeorm'
import UserEntity from './user.entity'

@Entity({
    name: 'Message'
})
export default class MessageEntity {
    @ObjectIdColumn()
    _id: string

    @Column()
    sender: UserEntity

    @Column()
    reciver: UserEntity

    @Column()
    des: string

    @Column()
    timestamp: Date

    constructor() {
        this.timestamp = new Date()
    }
}
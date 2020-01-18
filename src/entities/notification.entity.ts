import { Entity, Column, ObjectIdColumn, ManyToOne } from 'typeorm'
import UserEntity from './user.entity'

@Entity({
    name: 'Notification'
})
export default class NotificationEntity {
    @ObjectIdColumn()
    _id: string

    @Column()
    sender: UserEntity

    @Column()
    reciver: UserEntity

    @Column()
    type: string

    @Column()
    idPost: string

    @Column()
    timestamp: Date

    constructor() {
        this.timestamp = new Date()
    }
}
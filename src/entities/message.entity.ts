import { Entity, Column, ObjectIdColumn, ManyToOne } from 'typeorm'
import UserEntity from './user.entity'

export class MessageEntity {
    @ObjectIdColumn()
    _id: string

    @Column()
    createdBy: UserEntity

    @Column()
    content: string

    @Column()
    createdAt: Date

    constructor() {
        this.createdAt = new Date()
    }
}


@Entity({
    name: 'RoomChat'
})
export default class RoomChatEntity{
    @ObjectIdColumn()
    _id: string

    @Column()
    member: UserEntity[]

    @Column()
    messages: MessageEntity[]

    @Column()
    createdAt: Date

    constructor(){
        this.createdAt = new Date()
        this.member = []
        this.messages = []
    }
}

export class CreateMessageResponse{
    roomID: String
    message: MessageEntity
}
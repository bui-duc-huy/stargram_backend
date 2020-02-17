import { Injectable } from '@nestjs/common'
import { MessageInput, Message } from 'src/graphql.schema'
import UserEntity from 'src/entities/user.entity';
import RoomChatEntity, {MessageEntity, CreateMessageResponse} from 'src/entities/message.entity';
import { getMongoRepository } from 'typeorm';

@Injectable()
export class MessageService {
    async getAllMessage(): Promise<MessageEntity[]>{
        return await getMongoRepository(MessageEntity).find({})
    }

    async createMessage(message: MessageInput, idCreator: string): Promise<CreateMessageResponse> {
        const foundUser = await getMongoRepository(UserEntity).findOne(idCreator)

        const foundRoom = await getMongoRepository(RoomChatEntity).findOne(message.roomID)

        const newMessage = new MessageEntity()
        newMessage.content = message.content
        newMessage.createdBy = foundUser

        foundRoom.messages.push(newMessage)

        const savedMessage = await getMongoRepository(RoomChatEntity).save(foundRoom)
        return {
            roomID: foundRoom._id,
            message: newMessage
        }
    }

    async getAllRoomChat(){
        return await getMongoRepository(RoomChatEntity).find({})
    }

    async createRoom(idCreator: string, idMember:string[]){
        const newRoom = new RoomChatEntity()
        newRoom.member.push(await getMongoRepository(UserEntity).findOne(idCreator))

        for (let index = 0; index < idMember.length; index++) {
            newRoom.member.push(await getMongoRepository(UserEntity).findOne(idMember[index]))
        }

        const savedRoom = await getMongoRepository(RoomChatEntity).save(newRoom)
        return savedRoom
    }

    async deleteAllRoom(){
        const deleteRoom = await getMongoRepository(RoomChatEntity).deleteMany({})
        return deleteRoom.deletedCount > 0
    }
}

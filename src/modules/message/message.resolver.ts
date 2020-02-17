import { Resolver, Query, Mutation, Args, Context, Subscription, } from '@nestjs/graphql'
import { MessageService } from './message.service'
import { MessageInput, Message } from 'src/graphql.schema'
import { PubSub } from 'graphql-subscriptions'
import { WebSocketGateway } from '@nestjs/websockets'
import UserEntity from 'src/entities/user.entity';
import RoomChatEntity, {MessageEntity, CreateMessageResponse} from 'src/entities/message.entity';
import { getMongoRepository, Brackets } from 'typeorm';

const pubSub = new PubSub()

@Resolver('message')
export class MessageResolver {
    constructor(private readonly messageService: MessageService) { }

    @Mutation()
    async createMessage(@Args('message') message: MessageInput, @Context('currentUserID') userID: string): Promise<CreateMessageResponse> {
        const saveMessage = await this.messageService.createMessage(message, userID)
        pubSub.publish('messageCreated', {
            messageCreated: saveMessage
        })
        return saveMessage
    }

    @Subscription('messageCreated', {
        filter: async (payload, variables, context) => {
            const { currentUserID } = context.req
            const roomChat = await getMongoRepository(RoomChatEntity).findOne(payload.roomID)

            const { member } = roomChat

            let flagger = false
            for (let index = 0; index < member.length; index++) {
                if (member[index]._id.toString() == currentUserID) {
                    flagger = true
                    break
                }
            }
            
            if (payload.messageCreated.roomID.toString() != variables.roomID) {
                return false
            }
            return flagger && true
        }
    })
    messageCreated() {
        return pubSub.asyncIterator('messageCreated')
    }

    @Mutation()
    async createRoomChat(@Context('currentUserID') currentUserID: string, @Args('idMember') idMember: string[]){
        return await this.messageService.createRoom(currentUserID, idMember)
    }

    @Mutation()
    async deleteAllRoom(){
        return await this.messageService.deleteAllRoom()
    }

    @Query()
    async rooms(){
        return await this.messageService.getAllRoomChat()
    }

}

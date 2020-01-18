import { Injectable, Post } from "@nestjs/common";
import { getMongoRepository } from "typeorm";
import PostEntity from './../../entities/post.entity';
import UserEntity from './../../entities/user.entity'
import { GraphQLError } from "graphql";
import { AddPostInput, EditPostInput, CommentPostInput, CommentType, CreateNotificationInput } from "src/graphql.schema";
import CommentEntity from "src/entities/comment.entity";
import NotificationEntity from "src/entities/notification.entity";

@Injectable()
export class NotificationService {
    async getAllNotification(){
        return await getMongoRepository(NotificationEntity).find({})
    }

    async getNotificationByUser(_id: string){
        const foundUser = await getMongoRepository(UserEntity).findOne(_id)
        if (!foundUser) {
            throw new GraphQLError("You dont have permission")
        }

        return await getMongoRepository(NotificationEntity).find({
            reciver: foundUser
        })
    }
    async createNotification(input: CreateNotificationInput){
        const { idSender, idReciver, type } = input
        let _id = idSender
        const foundSender = await getMongoRepository(UserEntity).findOne(_id)
        if (!foundSender) {
            throw new GraphQLError("User doesnt exist")
        }

        _id = idReciver
        const foundReciver = await getMongoRepository(UserEntity).findOne(_id)
        if (!foundReciver) {
            throw new GraphQLError("User doesnt exist")
        }

        const newNotification = new NotificationEntity()
        newNotification.reciver =foundReciver
        newNotification.sender = foundSender

        if (type) {
            newNotification.type = type
        }

        const savedNotification = await getMongoRepository(NotificationEntity).save(newNotification)
        return savedNotification
    }
}
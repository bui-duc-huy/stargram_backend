import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { Query } from '@nestjs/graphql'
import { UseGuards } from "@nestjs/common";
import { AddPostInput, EditPostInput, Post, CommentType, CommentPostInput, CreateNotificationInput } from "src/graphql.schema";
import { NotificationService } from "./notification.service";
// import { GqlAuthGuard } from './../../guards/auth.guard'

@Resolver('post')
export class NotificationResolver {
    constructor(private notificationService: NotificationService){}

    @Query()
    async getAllNotification(){
        return await this.notificationService.getAllNotification()
    }
    @Query()
    async getNotificationByUser(@Args('idUser') idUser: string){
        return await this.notificationService.getNotificationByUser(idUser)
    }
    @Mutation()
    async createNotification(@Args('input') input: CreateNotificationInput){
        return await this.notificationService.createNotification(input)
    }
}

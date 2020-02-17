import { Resolver, Mutation, Args, Context } from "@nestjs/graphql";
import { Query } from '@nestjs/graphql'
import { UserService } from './user.service'
import { UseGuards } from "@nestjs/common";
import { LoginRequest, EditUserInput, CreateUserInput } from "src/graphql.schema";

@Resolver('user')
export class UserResolver {
    constructor(private userService : UserService){}

    @Query()
    async hello() {
        return 'hello'
    }

    @Query()
    async getAllUser(){
        return this.userService.getAllUser()
    }
    @Query()
    async getUserByPost(@Args('idPost') idPost: string){
        return await this.userService.getUserByPost(idPost)
    }

    @Query()
    async me(@Context('currentUserID') currentUserID){
        return await this.userService.me(currentUserID)
    }

    @Query()
    async getUserById(@Args('id') id: string){
        return await this.userService.getUserById(id)
    }

    @Mutation()
    async createUser(@Args('input') input: CreateUserInput) {
        return await this.userService.createUser(input)
    }
    
    @Mutation()
    async updateUser(@Context('currentUserID') _id, @Args('input') input: EditUserInput){
        return await this.userService.updateUser(_id, input)
    }

    @Mutation()
    async login(@Args('input') input: LoginRequest) {
        return await this.userService.login(input)
    }

    @Mutation()
    async forgotPassword(@Args('email') email:string){
        return await this.userService.forgotPassword(email)
    }

    @Mutation()
    async deleteAllUser(){
        return await this.userService.deleteAllUser()
    }

    @Mutation()
    async updateAvatar(@Args('_id') _id: string,  @Args('avatar') avatar: string){
        return await this.userService.updateAvatar(_id, avatar)
    }

    @Mutation()
    async toggleFollow(@Args('_id') _id: string, @Args('idFollowing') idFollowing: string){
        return await this.userService.toggleFollow(_id, idFollowing)
    }   

    @Mutation()
    async savePostToggle(@Args('_id') _id: string, @Args('idPost') idPost: string){

    }
}

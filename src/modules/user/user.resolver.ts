import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { Query } from '@nestjs/graphql'
import { UserService } from './user.service'
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from './../../guards/auth.guard'

@Resolver('user')
export class UserResolver {
    constructor(private userService : UserService){}

    @Query()
    async hello() {
        return 'hello'
    }

    @UseGuards(GqlAuthGuard)
    @Query()
    async getAllUser(){
        return this.userService.getAllUser()
    }

    @UseGuards(GqlAuthGuard)
    @Mutation()
    async login(@Args('username') username, @Args('password') password) {
        return await this.userService.login(username, password)
    }

    @Mutation()
    async createUser(@Args('input') input) {
        return await this.userService.createUser(input)
    }
    
    @Mutation()
    async editUser(@Args('_id') _id, @Args('input') input){
        return await this.userService.editUser(_id, input)
    }

    @Query()
    async getUserByPost(@Args('idPost') idPost){
        return await this.userService.getUserByPost(idPost)
    }
}

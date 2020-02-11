import { Resolver, Mutation, Args, Context } from "@nestjs/graphql";
import { Query } from '@nestjs/graphql'
import { PostService } from './post.service'
import { UseGuards } from "@nestjs/common";
import { AddPostInput, EditPostInput, Post, CommentType, CommentPostInput, User } from "src/graphql.schema";
import UserEntity from "src/entities/user.entity";
// import { GqlAuthGuard } from './../../guards/auth.guard'

@Resolver('post')
export class PostResolver {
    constructor(private postService: PostService){}

    @Query()
    async getAllPost(){
        return await this.postService.getAllPost()
    }   

    @Query()
    async getPostByUser(@Args('idUser') idCreator: string){
       
    }

    @Mutation()
    async createPost(@Args('input') input: AddPostInput, @Context('currentUser') currentUser: UserEntity) {
        return await this.postService.createPost(currentUser, input)
    }

    @Mutation()
    async editPost(@Args('idPost') idPost: string, @Args('input') input: EditPostInput){
        return await this.postService.editPost(idPost, input)
    }

    @Mutation()
    async deletePost(@Args('idPost') idPost: string){
        return await this.postService.deletePost(idPost)
    }   
    
    @Mutation()
    async toggleLikePost(@Args('idPost') idPost: string, @Context('currentUser') currentUser:UserEntity){
       return this.postService.toggleLikePost(currentUser, idPost)
    }

    @Mutation()
    async commentPost(@Args('idPost') idPost: string, @Args('input') input: CommentPostInput, @Context('currentUser') currentUser:UserEntity){
        return this.postService.commentOnPost(currentUser, idPost, input)
    } 

    @Mutation()
    async toggleLikeComment(idPost: string, idComment: string){
        
    }

    @Mutation()
    async deleteAllPost(){
        return await this.postService.deleteAllPost()
    }

    @Mutation()
    async deleteComment(@Args('idPost') idPost: string, @Args('idComment') idComment: string){
        return await this.postService.deleteComment(idPost, idComment)
    }
}

import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { Query } from '@nestjs/graphql'
import { PostService } from './post.service'
import { UseGuards } from "@nestjs/common";
import { AddPostInput, EditPostInput, Post, CommentType, CommentPostInput } from "src/graphql.schema";
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
    async createPost(@Args('idCreator') idCreator: string, @Args('input') input: AddPostInput) {
        return await this.postService.createPost(idCreator, input)
    }

    @Mutation()
    async editPost(@Args('idPost') idPost: string, @Args('input') input: EditPostInput){
        return await this.postService.editPost(idPost, input)
    }

    @Mutation()
    async deletePost(@Args('idPost') idPost: string){
        
    }
    
    @Mutation()
    async toggleLikePost(@Args('idUser') idUser: string,@Args('idPost') idPost: string){
       return this.postService.toggleLikePost(idUser, idPost)
    }

    @Mutation()
    async commentPost(@Args('idUser') idUser: string, @Args('idPost') idPost: string, @Args('input') input: CommentPostInput){
        return this.postService.commentOnPost(idUser, idPost, input)
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

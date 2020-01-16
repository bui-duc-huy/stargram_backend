import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { Query } from '@nestjs/graphql'
import { PostService } from './post.service'
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from './../../guards/auth.guard'

@Resolver('post')
export class PostResolver {
    constructor(private postService: PostService){}

    @Query()
    async getAllPost(){
        return await this.postService.getAllPost()
    }

    @Query()
    async getPostByUser(@Args('idUser') idUser){
        return await this.postService.getPostByUser(idUser)
    }

    @Mutation()
    async createPost(@Args('idUser') idUser, @Args('post') post) {
        return await this.postService.createPost(idUser, post)
    }

    @Mutation()
    async editPost(@Args('idPost') idPost, @Args('post') post){
        return await this.postService.editPost(idPost, post)
    }

    @Mutation()
    async deletePost(@Args('idPost') idPost){
        return await this.postService.deletePost(idPost)
    }
}

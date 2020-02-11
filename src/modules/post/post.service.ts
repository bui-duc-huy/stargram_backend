import { Injectable, Post } from "@nestjs/common";
import { getMongoRepository } from "typeorm";
import PostEntity from './../../entities/post.entity';
import UserEntity from './../../entities/user.entity'
import { GraphQLError } from "graphql";
import { AddPostInput, EditPostInput, CommentPostInput, User } from "src/graphql.schema";
import CommentEntity from "src/entities/comment.entity";

@Injectable()
export class PostService {
    async createPost(creator: UserEntity, input: AddPostInput) {
        const { description, thumbnails } = input
        const newPost = new PostEntity()

        if (description) {
            newPost.description = description
        }

        if (thumbnails[0]) {
            newPost.thumbnails = thumbnails
        }

        newPost.creator = creator

        const savedPost = await getMongoRepository(PostEntity).save(newPost)
        return savedPost
    }

    async deleteAllPost() {
        await getMongoRepository(PostEntity).deleteMany({})
        return true
    }

    async getAllPost() {
        return await getMongoRepository(PostEntity).find({})
    }

    async getPostByUser(idUser) {
        // const user = await getMongoRepository(UserEntity).findOne(idUser)
        // let foundPost = []
        // for (let index = 0; index < user.idPosts.length; index++) {
        //     const post =  await getMongoRepository(PostEntity).findOne({_id: user.idPosts[index]})
        //     foundPost.push(post)            
        // }  
        // return foundPost
    }

    async editPost(_id: string, input: EditPostInput) {
        const foundPost = await getMongoRepository(PostEntity).findOne(_id)
        if (!foundPost) {
            throw new GraphQLError("Post doesnt exist")
        }

        const { description, thumbnails } = input

        if (description) {
            foundPost.description = description
        }
        if (thumbnails) {
            foundPost.thumbnails = thumbnails
        }

        const savedPost = await getMongoRepository(PostEntity).save(foundPost)
        return savedPost
    }

    async deletePost(_id: string) {
        const foundPost = await getMongoRepository(PostEntity).findOne(_id)
        if (!foundPost) {
            throw new GraphQLError("Post doesnt exist")
        }

        await getMongoRepository(PostEntity).deleteOne(foundPost)
        return true
    }

    async toggleLikePost(userLike: UserEntity, idPost: string) {
        const _id = idPost
        const foundPost = await getMongoRepository(PostEntity).findOne(_id)
        if (!foundPost) {
            throw new GraphQLError("Post doesnt exist")
        }
        for (let index = 0; index < foundPost.likes.length; index++) {
            if (foundPost.likes[index]._id == userLike._id) {
                foundPost.likes.splice(index, 1)
                const savedPost = await getMongoRepository(PostEntity).save(foundPost)
                return false
            }
        }

        foundPost.likes.push(userLike)
        const savedPost = await getMongoRepository(PostEntity).save(foundPost)
        return true
    }

    async commentOnPost(userComment: UserEntity, idPost: string, input: CommentPostInput) {
        const _id = idPost
        const foundPost = await getMongoRepository(PostEntity).findOne(_id)
        if (!foundPost) {
            throw new GraphQLError("Post doesnt exist")
        }

        const { description, thumbnails } = input
        const newComment = new CommentEntity()

        newComment.creator = userComment

        if (description) {
            newComment.description = description
        }
        if (thumbnails) {
            newComment.thumbnails = thumbnails
        }

        foundPost.comments.push(newComment)

        const savedPost = await getMongoRepository(PostEntity).save(foundPost)
        return savedPost
    }

    async deleteComment(_id: string, idComment: string){
        const foundPost = await getMongoRepository(PostEntity).findOne(_id)
        if(!foundPost){
            throw new GraphQLError("Post doesnt exist")
        }

        for (let index = 0; index < foundPost.comments.length; index++) {
            if(foundPost.comments[index]._id == idComment){
                foundPost.comments.splice(index, 1)
                const savedPost = await getMongoRepository(PostEntity).save(foundPost)
                return savedPost
            }
        }
    }

}
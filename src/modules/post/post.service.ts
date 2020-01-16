import { Injectable, Post } from "@nestjs/common";
import {  getMongoRepository } from "typeorm";
import PostEntity from './../../entities/post.entity';
import UserEntity from './../../entities/user.entity'

@Injectable()
export class PostService {
    async createPost(idUser, input) {
        const post = new PostEntity(input)
        post.idCreator = idUser
        const foundUser = await getMongoRepository(UserEntity).findOne(idUser)
        const newPost = await getMongoRepository(PostEntity).save(post)
        foundUser.idPosts.push(post._id)
        await getMongoRepository(UserEntity).save(foundUser)
        return newPost
    }

    async getAllPost() {
        return getMongoRepository(PostEntity).find({})
    }

    async getPostByUser(idUser) {
        const user = await getMongoRepository(UserEntity).findOne(idUser)
        let foundPost = []
        for (let index = 0; index < user.idPosts.length; index++) {
            const post =  await getMongoRepository(PostEntity).findOne({_id: user.idPosts[index]})
            foundPost.push(post)            
        }  
        return foundPost
    }

    async editPost(idPost, post) {
        let currentPost = await getMongoRepository(PostEntity).findOne(idPost)
        if (post.des) currentPost.des = post.des
        if (post.image) currentPost.image = post.image
        if (post.title) currentPost.title = post.title
        const savedPost = await getMongoRepository(PostEntity).save(currentPost)
        return savedPost
    }

    async deletePost(idPost) {
        let deletePost = await getMongoRepository(PostEntity).findOne(idPost)
        await getMongoRepository(PostEntity).deleteOne(deletePost)
        return true
    }
}
import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { getMongoManager, getMongoRepository, getRepository } from "typeorm";
import  UserEntity  from './../../entities/user.entity';
import PostEntity from "src/entities/post.entity";
import { GraphQLError } from "graphql";


@Injectable()
export class UserService {
    async decodeToken(token: String): Promise<UserEntity> {
        // TODO:
        // Decode token để lấy object trong token
        // return { userID: '1', signedAt: 1577590325199 }
        const user = jwt.verify(token, 'buiduchuy')
        return user
    }

    async getToken(user): Promise<any>{
        return jwt.sign({...user}, 'buiduchuy')
    }
    
    async createUser(user){
        const { username } = user
        const existedUser = await getRepository(UserEntity).findOne({ username })
        if(existedUser){
            throw new GraphQLError("User has already exist")
        }
        const newUser = new UserEntity()
        newUser.username = user.username
        newUser.password = user.password
        await getMongoManager().save(UserEntity, newUser)
        return user
    }

    async getAllUser(){
        return getMongoRepository(UserEntity).find({})
    }

    async login(username, password){
        const message = 'Incorrect username or password'

        const user = await getMongoRepository(UserEntity).findOne({
            username,
            password
        })

        if(!user){
            throw new Error(message)
        }
        const token = jwt.sign({...user},'buiduchuy')
        return { token }
    }

    async editUser(_id, input){
        return input
    }

    async deleteAllUser(){
        await getMongoRepository(UserEntity).delete({})
        return 'true'
    }

    async getUserByPost(idPost){
        const foundPost = await getMongoRepository(PostEntity).findOne(idPost)
        const foundUser = await getMongoRepository(UserEntity).findOne(foundPost.idCreator)
        return foundUser
    }

    async me(token){
        const user = this.decodeToken(token)
        return user
    }

    async getUserById(id){
        let foundUser = []
        for (let index = 0; index < id.length; index++) {
            foundUser.push(await getMongoRepository(UserEntity).findOne(id[index]))          
        }
        return foundUser
    }
}



import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { getMongoManager, getMongoRepository, getRepository, ObjectID } from "typeorm";
import UserEntity from './../../entities/user.entity';
import PostEntity from "src/entities/post.entity";
import { GraphQLError } from "graphql";
import { AuthenticationError } from 'apollo-server-core'
import { userInfo } from "os";
import { CreateUserInput, LoginRequest, EditUserInput } from "src/graphql.schema";

@Injectable()
export class UserService {
    async decodeToken(token: String): Promise<UserEntity> {
        // TODO:
        // Decode token để lấy object trong token
        // return { userID: '1', signedAt: 1577590325199 }
        const user = jwt.verify(token, 'buiduchuy')
        return user
    }

    async getToken(user): Promise<any> {
        return jwt.sign({ ...user }, 'buiduchuy')
    }

    async createUser(user: CreateUserInput) {
        const { email, username} = user
        const existedUserByEmail = await getRepository(UserEntity).findOne({ 
            email 
        })
        const exsitedUserByUsername = await getRepository(UserEntity).findOne({ 
            username 
        })
        
        if (existedUserByEmail) {
            throw new GraphQLError("Email has used to register another account")
        }
        if(exsitedUserByUsername) {
            throw new GraphQLError("Username has already exist")
        }

        const newUser = new UserEntity()
        newUser.email = user.email
        newUser.username = user.username
        newUser.password = user.password
        newUser.fullname = user.fullname
        await getMongoManager().save(UserEntity, newUser)
        return user
    }

    async getAllUser() {
        return await getMongoRepository(UserEntity).find({})
    }

    async login(input: LoginRequest) {
        const message = 'Incorrect username or password'
        const { email, password } = input

        const foundUser = await getMongoRepository(UserEntity).findOne({
            email
        })

        if (!foundUser || !(await foundUser.matchPassword(password))) {
            throw new Error(message)
        }

        const hashToken = {
            currentUser : foundUser
        }

        const token = jwt.sign(hashToken, process.env.SECRET_KEY)
        const id = foundUser._id

        const response = {
            id,
            token
        }
        return response
    }

    async updateUser(_id: string, input: EditUserInput) {
        const foundUser = await getMongoRepository(UserEntity).findOne(_id)
        if (!foundUser) {
            throw new GraphQLError("User have not exist")
        }

        const { fullname, email, password } = input

        if (fullname) foundUser.fullname = fullname
        if (email) foundUser.email = email
        if (password) foundUser.password = await foundUser.newPassword(password)

        const savedUser = await getMongoRepository(UserEntity).save(foundUser)
        return savedUser
    }

    async deleteAllUser() {
        const deleteUser = await getMongoRepository(UserEntity).deleteMany({
            role: 'MEMBER'
        })
        
        return deleteUser.deletedCount !== 0
    }

    async getUserByPost(idPost: string) {
        // const foundPost = await getMongoRepository(PostEntity).findOne(idPost)
        // const foundUser = await getMongoRepository(UserEntity).findOne(foundPost.idCreator)

        // if (!foundUser) {
        //     throw new GraphQLError("User does not exist")
        // }

        // return foundUser
    }

    async me(token: string) {
        const user = await this.decodeToken(token)
        const { email } = user
        const foundUser = await getMongoRepository(UserEntity).findOne({ email })

        if (!foundUser) {
            throw new AuthenticationError("You dont have permission")
        }

        return user
    }

    async getUserById(id) {
        let foundUser
        let userArray = []
        for (let index = 0; index < id.length; index++) {
            foundUser = await getMongoRepository(UserEntity).findOne(id[index])
            if (!foundUser) {
                throw new GraphQLError("User does not exist")
            }
            userArray.push(foundUser)
        }
        return userArray
    }

    async forgotPassword(email: string) {
        let foundUser = await getMongoRepository(UserEntity).findOne({ email })

        if (!foundUser) {
            throw new AuthenticationError("You dont have permission")
        }

        foundUser.password = await foundUser.newPassword("123")
        const savedUser = await getMongoRepository(UserEntity).save(foundUser)
        return savedUser
    }

    async updateAvatar(_id: string, avatar: string) {
        const foundUser = await getMongoRepository(UserEntity).findOne(_id)

        if (!foundUser) {
            throw new AuthenticationError("You dont have permission")
        }

        foundUser.avatar = avatar
        const savedUser = await getMongoRepository(UserEntity).save(foundUser)
        return savedUser
    }

    async toggleFollow(_id: string, idFollowing: string) {
        const foundUser = await getMongoRepository(UserEntity).findOne(_id)
        const personFollowed = await getMongoRepository(UserEntity).findOne(idFollowing)

        if (!foundUser) {
            throw new AuthenticationError("You dont have permission")
        }
        if (!personFollowed) {
            throw new GraphQLError("user does not exist")
        }

        for (let index = 0; index < foundUser.followings.length; index++) {
            if (foundUser.followings[index] == idFollowing) {
                foundUser.followings.splice(index, 1)
                for (let i = 0; i < personFollowed.followers.length; i++) {
                    if (personFollowed.followers[index] == _id) {
                        personFollowed.followers.splice(index, 1)
                        await getMongoRepository(UserEntity).save(personFollowed)
                        break
                    }
                }
                const savedUser = await getMongoRepository(UserEntity).save(foundUser)
                return savedUser
            }
        }

        foundUser.followings.push(idFollowing)
        personFollowed.followers.push(_id)
        await getMongoRepository(UserEntity).save(personFollowed)
        const savedUser = await getMongoRepository(UserEntity).save(foundUser)

        return savedUser
    }

    async savePostToggle(_id: string, idPost: string){
        const foundUser = await getMongoRepository(UserEntity).findOne(_id)

        if(!foundUser){
            throw new GraphQLError("You dont have permission")
        }

        for (let index = 0; index < foundUser.savedPost.length; index++) {
            if(foundUser.savedPost[index] == idPost){
                foundUser.savedPost.splice(index, 1)
                const savedUser = await getMongoRepository(UserEntity).save(foundUser)
                return savedUser
            }            
        }
        
        foundUser.savedPost.push(idPost)
        const savedUser = await getMongoRepository(UserEntity).save(foundUser)
        return savedUser
    }

    async updateDescription(_id: string, description: string){
        const foundUser = await getMongoRepository(UserEntity).findOne(
            _id
        )

        if(!foundUser){
            throw new GraphQLError("You dont have permission")
        }
        foundUser.description = description
        const savedUser = await getMongoRepository(UserEntity).save(foundUser)

        return savedUser
    }
}



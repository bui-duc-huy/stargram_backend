import { Entity, Column, ObjectIdColumn, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm'
import PostEntity from './post.entity'
import * as bcrypt from 'bcrypt'

@Entity({
  name: 'User'
})
export default class UserEntity {
  @ObjectIdColumn()
  _id: string

  @Column()
  email: string

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  fullname: string

  @Column()
  avatar: string

  @Column()
  dob: Date

  @Column()
  followings: string[]

  @Column()
  followers: string[]

  @Column()
  description: string

  @Column()
  savedPost: string[]

  @Column()
  createAt: Date

  @Column()
  role: string

  @Column()
  sex: string

  @BeforeInsert()
  async b4Register() {
    this.role = "MEMBER"
    this.avatar = 'https://i.stack.imgur.com/l60Hf.png'
    this.description = ''
    this.dob = new Date()
    this.createAt = new Date()
    this.savedPost = []
    this.followers = []
    this.followings = []
    this.password = await bcrypt.hash(this.password, 10)
    this.sex = 'male'
  }

  async newPassword(password) {
    return await bcrypt.hash(password, 10)
  }

  async matchPassword(password) {
    return await bcrypt.compare(password, this.password)
  }

}
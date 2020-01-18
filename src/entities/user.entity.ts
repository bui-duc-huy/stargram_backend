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

  @BeforeInsert()
  async b4Register() {
    this.role = "MEMBER"
    this.avatar = ''
    this.description = ''
    this.createAt = new Date
    this.savedPost = []
    this.followers = []
    this.followings = []
    this.password = await bcrypt.hash(this.password, 10)
  }

  async newPassword(password) {
    return await bcrypt.hash(password, 10)
  }

  async matchPassword(password) {
    return await bcrypt.compare(password, this.password)
  }

}
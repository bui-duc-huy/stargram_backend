import { Entity, Column, ObjectIdColumn, OneToMany } from 'typeorm'
import PostEntity from './post.entity'

@Entity({
  name: 'User'
})
export default class UserEntity {
  @ObjectIdColumn()
  _id: string

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  role: string

  @Column()
  idPosts: string[]
  
  constructor(args: Partial<UserEntity>) {
    Object.assign(this, args)
    this.idPosts = []
  }
}
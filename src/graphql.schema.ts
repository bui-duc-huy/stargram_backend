
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface AddPostInput {
    title?: string;
    des?: string;
    image?: string;
}

export interface CreateUserInput {
    username?: string;
    password?: string;
    role?: string;
}

export interface EditPostInput {
    title?: string;
    des?: string;
    image?: string;
}

export interface EditUserInput {
    username?: string;
    password?: string;
    role?: string;
}

export interface LoginResponse {
    token?: string;
}

export interface IMutation {
    createPost(idUser?: string, post?: AddPostInput): Post | Promise<Post>;
    editPost(idPost?: string, post?: EditPostInput): Post | Promise<Post>;
    deletePost(_id?: string): boolean | Promise<boolean>;
    createUser(input?: CreateUserInput): User | Promise<User>;
    login(username?: string, password?: string): LoginResponse | Promise<LoginResponse>;
    editUser(_id?: string, input?: EditUserInput): User | Promise<User>;
}

export interface Post {
    _id?: string;
    title?: string;
    des?: string;
    image?: string;
    like?: number;
    dislike?: number;
    idCreator?: string;
}

export interface IQuery {
    getAllPost(): Post[] | Promise<Post[]>;
    getPostByUser(idCreator?: string): Post[] | Promise<Post[]>;
    hello(): string | Promise<string>;
    getAllUser(): User[] | Promise<User[]>;
    getUserByPost(idCreator?: string): User | Promise<User>;
}

export interface User {
    _id?: string;
    username?: string;
    password?: string;
    role?: string;
    idPosts?: string[];
}

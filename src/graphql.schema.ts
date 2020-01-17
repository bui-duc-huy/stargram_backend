
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
    email?: string;
    username?: string;
    password?: string;
    fullname?: string;
}

export interface EditPostInput {
    title?: string;
    des?: string;
    image?: string;
}

export interface EditUserInput {
    email?: string;
    password?: string;
    fullname?: string;
}

export interface LoginRequest {
    email?: string;
    password?: string;
}

export interface LoginResponse {
    id?: string;
    token?: string;
}

export interface IMutation {
    createPost(idCreator?: string, post?: string): Post | Promise<Post>;
    editPost(idPost?: string, post?: EditPostInput): Post | Promise<Post>;
    deletePost(_id?: string): boolean | Promise<boolean>;
    likePost(idPost?: string): Post | Promise<Post>;
    disLikePost(idPost?: string): Post | Promise<Post>;
    createUser(input?: CreateUserInput): User | Promise<User>;
    login(input?: LoginRequest): LoginResponse | Promise<LoginResponse>;
    updateUser(_id?: string, input?: EditUserInput): User | Promise<User>;
    forgotPassword(email?: string): User | Promise<User>;
    updateAvatar(_id?: string, avatar?: string): User | Promise<User>;
    deleteAllUser(): boolean | Promise<boolean>;
    toggleFollow(_id?: string, idFollowing?: string): User | Promise<User>;
    savePostToggle(_id?: string, idPost?: string): Post | Promise<Post>;
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
    getUserByPost(idPost?: string): User | Promise<User>;
    me(token?: string): User | Promise<User>;
    getUserById(id?: string[]): User[] | Promise<User[]>;
}

export interface User {
    _id?: string;
    email?: string;
    username?: string;
    password?: string;
    fullname?: string;
    avatar?: string;
    followers?: string[];
    followings?: string[];
    createAt?: string;
    role?: string;
    description?: string;
    savedPost?: string[];
}

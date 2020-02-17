
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export enum Roles {
    ADMIN = "ADMIN",
    MEMBER = "MEMBER"
}

export enum Sexs {
    male = "male",
    female = "female"
}

export interface AddPostInput {
    description?: string;
    thumbnails?: string[];
}

export interface CommentPostInput {
    description?: string;
    thumbnails?: string;
}

export interface CreateNotificationInput {
    idSender?: string;
    idReciver?: string;
    type?: string;
}

export interface CreateUserInput {
    email?: string;
    username?: string;
    password?: string;
    fullname?: string;
}

export interface EditPostInput {
    description?: string;
    thumbnails?: string[];
}

export interface EditUserInput {
    email?: string;
    fullname?: string;
    sex?: Sexs;
    dob?: string;
    username?: string;
    description?: string;
}

export interface LoginRequest {
    email?: string;
    password?: string;
}

export interface CommentType {
    _id?: string;
    creator?: User;
    thumbnails?: string;
    description?: string;
    commentAt?: string;
    likes?: User[];
}

export interface LoginResponse {
    id?: string;
    token?: string;
}

export interface IMutation {
    createNotification(input?: CreateNotificationInput): Notification | Promise<Notification>;
    deleteAllNotification(): boolean | Promise<boolean>;
    createPost(input?: AddPostInput): Post | Promise<Post>;
    editPost(idPost?: string, input?: EditPostInput): Post | Promise<Post>;
    deletePost(idPost?: string): boolean | Promise<boolean>;
    toggleLikePost(idPost?: string): boolean | Promise<boolean>;
    commentPost(idPost?: string, input?: CommentPostInput): Post | Promise<Post>;
    toggleLikeComment(idPost?: string, idComment?: string): Post | Promise<Post>;
    deleteComment(idPost?: string, idComment?: string): Post | Promise<Post>;
    deleteAllPost(): boolean | Promise<boolean>;
    createUser(input?: CreateUserInput): User | Promise<User>;
    login(input?: LoginRequest): LoginResponse | Promise<LoginResponse>;
    updateUser(input?: EditUserInput): User | Promise<User>;
    forgotPassword(email?: string): User | Promise<User>;
    updateAvatar(_id?: string, avatar?: string): User | Promise<User>;
    deleteAllUser(): boolean | Promise<boolean>;
    toggleFollow(_id?: string, idFollowing?: string): User | Promise<User>;
    savePostToggle(_id?: string, idPost?: string): User | Promise<User>;
}

export interface Notification {
    _id?: string;
    sender?: User[];
    reciver?: User[];
    type?: string;
    idPost?: string;
    timestamp?: string;
}

export interface Post {
    _id?: string;
    description?: string;
    thumbnails?: string[];
    likes?: User[];
    creator?: User;
    comments?: CommentType[];
    createAt?: string;
}

export interface IQuery {
    getAllNotification(): Notification | Promise<Notification>;
    getNotificationByUser(idUser?: string): Notification | Promise<Notification>;
    getAllPost(): Post[] | Promise<Post[]>;
    getPostByUser(idCreator?: string): Post[] | Promise<Post[]>;
    hello(): string | Promise<string>;
    getAllUser(): User[] | Promise<User[]>;
    getUserByPost(idPost?: string): User | Promise<User>;
    me(): User | Promise<User>;
    getUserById(id?: string[]): User[] | Promise<User[]>;
}

export interface User {
    _id?: string;
    email?: string;
    username?: string;
    password?: string;
    fullname?: string;
    avatar?: string;
    dob?: string;
    followers?: string[];
    followings?: string[];
    createAt?: string;
    role?: Roles;
    description?: string;
    savedPost?: string[];
    sex?: Sexs;
}

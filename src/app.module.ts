import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config'
import { PostModule } from './modules/post/post.module'
import { NotificationModule } from './modules/notification/notification.module'
import { GraphqlService } from './config/graphql/graphql.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      database: 'SocialNetworking',
      url: 'mongodb+srv://duchuy:123@cluster0-59mg4.mongodb.net/test?retryWrites=true&w=majority',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    GraphQLModule.forRootAsync({
      useClass: GraphqlService
    }),
    UserModule,
    PostModule,
    NotificationModule
  ],
})
export class AppModule { }

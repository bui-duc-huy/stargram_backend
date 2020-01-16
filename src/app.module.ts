import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config'
import { PostModule } from './modules/post/post.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      database: 'LoginAutheticate',
      url: 'mongodb+srv://duchuy:123@cluster0-omxr5.mongodb.net/test?retryWrites=true&w=majority',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    GraphQLModule.forRoot({
      playground: true,
      debug: true,
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ req })
    }),
    UserModule,
    PostModule
  ],
})
export class AppModule { }

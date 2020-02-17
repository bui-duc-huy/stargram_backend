import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import * as jwt from 'jsonwebtoken'
import { GraphQLError } from 'graphql'
import { MessageResolver } from './message.resolver'
import { MessageService } from './message.service'

@Module({
    providers: [MessageResolver, MessageService],
    exports: [MessageService]
})
export class MessageModule { }

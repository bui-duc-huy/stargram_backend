import { Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlOptionsFactory, GqlModuleOptions } from "@nestjs/graphql";
import * as jwt from 'jsonwebtoken'
import { GraphQLError } from "graphql";
import { getMongoRepository } from "typeorm";
import UserEntity from "src/entities/user.entity";

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
    async createGqlOptions(): Promise<GqlModuleOptions> {
        const directiveResolvers = {
            hasRoles: async (next, source, args, ctx) => {
                const { roles } = args

                const { currentUserID } = ctx

                if (!currentUserID) {
                    throw new GraphQLError('you dont have permission')
                }

                const foundUser = await getMongoRepository(UserEntity).findOne(currentUserID)

                if (roles.indexOf(foundUser.role) === -1) {
                    throw new GraphQLError('you dont have permission')
                }

                return next()
            }
        }

        return {
            playground: true,
            debug: true,
            directiveResolvers,
            formatError: err => {
                return {
                    message: err.message,
                    code: err.extensions && err.extensions.code,
                    locations: err.locations,
                    path: err.path
                }
            },
            formatResponse: err => {
                return err
            },
            typePaths: ['./**/*.graphql'],
            context: async ({ req, res, connection }) => {
                if (connection) {
                    return {
                        currentUserID: connection.context.currentUserID,
                    }
                }

                const { authorization } = req.headers

                if (authorization) {
                    if (authorization.split(' ')[0] !== 'Bearer') {
                        throw new GraphQLError("Invalid token")
                    }
                    const token = authorization.split(' ')[1]

                    const decoded = await jwt.verify(token, process.env.SECRET_KEY, (err, dec) => {
                        if (err) throw new GraphQLError(err.message || err.name)
                        return dec
                    })

                    return {
                        currentUserID: decoded.currentUserID,
                        req,
                        res
                    }
                }
            },
            installSubscriptionHandlers: true,
            subscriptions: {
                keepAlive: 1000,
                onConnect: async (connectionParams: any, ws) => {
                    const authorization = connectionParams.authorization
                    if (!authorization) {
                        return false
                    }

                    if (authorization.split(' ')[0] !== 'Bearer') {
                        throw new GraphQLError('Invalid token')
                    }

                    const token = authorization.split(' ')[1]

                    try {
                        const { currentUserID } = await jwt.verify(token, process.env.SECRET_KEY)

                        const foundUser = await getMongoRepository(UserEntity).findOne(currentUserID)

                        foundUser.isOnline = true

                        await getMongoRepository(UserEntity).save(foundUser)

                        return {
                            currentUserID
                        }
                    } catch{
                        throw new GraphQLError('Invalid token')
                    }
                },
                onDisconnect: async (ws, context) => {
                    const { initPromise } = context

                    const { currentUserID } = await initPromise

                    const foundUser = await getMongoRepository(UserEntity).findOne(currentUserID)

                    foundUser.isOnline = false

                    await getMongoRepository(UserEntity).save(foundUser)
                }
            }
        }
    }
}
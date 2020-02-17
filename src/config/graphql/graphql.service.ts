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
                return err
            },
            formatResponse: err => {
                return err
            },
            typePaths: ['./**/*.graphql'],
            context: async ({ req, res, connection }) => {
                if (connection) {
                    return {
                        req: connection.context,
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

                    return decoded
                } else {
                    return {
                        currentUser: {
                            username: 'guest',
                            fullname: 'guest',
                            role: "GUEST"
                        }
                    }
                }
            },
            installSubscriptionHandlers: true,
            subscriptions: {
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
                        const userID = await jwt.verify(token, process.env.SECRET_KEY)
                        return userID
                    } catch{
                        throw new GraphQLError('Invalid token')
                    }
                }
            }
        }
    }
}
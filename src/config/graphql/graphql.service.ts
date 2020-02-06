import { Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlOptionsFactory, GqlModuleOptions } from "@nestjs/graphql";
import * as jwt from 'jsonwebtoken'
import { GraphQLError } from "graphql";

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
    async createGqlOptions(): Promise<GqlModuleOptions> {
        const directiveResolvers = {
            hasRoles: async (next, source, args, ctx) => {
                const { roles } = args

                if (roles.indexOf(ctx.currentUser.role) === -1) {
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
    
                    const decoded =  await jwt.verify(token, process.env.SECRET_KEY, (err, dec) =>{
                        if(err) throw new GraphQLError(err.message || err.name)
                        return dec
                    })
    
                    return decoded
                }
            }
        }
    }
}
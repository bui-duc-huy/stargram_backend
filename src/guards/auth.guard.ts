import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class GqlAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const  token  = context.getArgs()[2].req.headers.authorization
        // console.log(token)
        return true
    }
}
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class GqlAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const { headers } = context.switchToHttp().getRequest()
        console.log(1)
        return true
    }
}
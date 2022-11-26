import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { GqlExecutionContext } from '@nestjs/graphql';

dotenv.config();

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  canActivate(context: ExecutionContext) {
    if (process.env.DEBUG) {
      const ctx = GqlExecutionContext.create(context);
      if ('dev' in ctx.getContext().req.query) {
        return true;
      }
    }

    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

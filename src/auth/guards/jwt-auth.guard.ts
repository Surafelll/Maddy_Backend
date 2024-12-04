import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);  // Delegate to Passport's JWT strategy
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}

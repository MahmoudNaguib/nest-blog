import {
  UnauthorizedException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../modules/users/services/auth.service';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly service: AuthService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (
      req.headers.authorization == '' ||
      req.headers.authorization == undefined
    ) {
      throw new UnauthorizedException('Invalid token');
    }
    const token = req.headers.authorization.replace('Bearer', '').trim();
    if (token == '' || token == undefined) {
      throw new UnauthorizedException('Invalid token');
    }
    const user = await this.service.findUserByToken(token);
    if (!user) {
      throw new UnauthorizedException('User is not authenticated');
    }
    req['user'] = user;
    next();
  }
}

import {
  UnauthorizedException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../modules/users/services/user.service';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  //constructor(private readonly service: UserService) {}
  constructor(private readonly service: UserService) {}
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

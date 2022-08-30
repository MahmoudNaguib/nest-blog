import {
  UnauthorizedException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../Modules/Users/Services/AuthService';
import { CustomUnAuthorizedException } from '../Exceptions/CustomUnAuthorized.exception';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly service: AuthService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (
      req.headers.authorization == '' ||
      req.headers.authorization == undefined
    ) {
      throw new CustomUnAuthorizedException();
    }
    const token = req.headers.authorization.replace('Bearer', '').trim();
    if (token == '' || token == undefined) {
      throw new CustomUnAuthorizedException();
    }
    const user = await this.service.findUserByToken(token);
    if (!user) {
      throw new CustomUnAuthorizedException();
    }
    req['user'] = user;
    next();
  }
}

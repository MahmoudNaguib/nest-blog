import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Request,
  Body,
} from '@nestjs/common';
/////////////////////////////////////////////////
import { LoginRequest } from '../requests/login.request';
import { UserService } from '../services/user.service';
///////////////////////////////////////////////////
import { UserResource } from '../resources/user.resource';
import { CreateRequest } from '../requests/create.request';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly service: UserService) {}
  @Post('/login')
  async login(@Body() record: LoginRequest) {
    const row = await this.service.login(record);
    return { data: new UserResource(row).toArray(), token: row.token };
  }
  @Post('/register')
  async register(@Body() record: CreateRequest) {
    const row = await this.service.create(record);
    return {
      message: 'Registration successfully',
      data: new UserResource(row).toArray(),
    };
  }
}

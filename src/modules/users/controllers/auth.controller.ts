import { Controller, Post, Body } from '@nestjs/common';
/////////////////////////////////////////////////
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../requests/auth/login.request';
import { RegisterRequest } from '../requests/auth/register.request';
import { UserResource } from '../resources/user.resource';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @Post('/login')
  async login(@Body() record: LoginRequest) {
    const row = await this.service.login(record);
    return { data: new UserResource(row).toArray(), token: row.token };
  }
  @Post('/register')
  async register(@Body() record: RegisterRequest) {
    const row = await this.service.register(record);
    return {
      message: 'Registration successfully',
      data: new UserResource(row).toArray(),
    };
  }
}

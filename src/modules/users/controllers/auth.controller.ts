import { Controller, Post, Body } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
/////////////////////////////////////////////////
import { LoginRequest } from '../requests/auth/login.request';
import { RegisterRequest } from '../requests/auth/register.request';
import { AuthService as Service } from '../services/auth.service';
import { UserResource as Resource } from '../resources/user.resource';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly service: Service) {}

  @Post('/login')
  @FormDataRequest()
  async login(@Body() record: LoginRequest) {
    const row = await this.service.login(record);
    return { data: new Resource(row).toArray(), token: row.token };
  }

  @Post('/register')
  @FormDataRequest()
  async register(@Body() record: RegisterRequest) {
    const row = await this.service.register(record);
    return {
      message: 'Registration successfully',
      data: new Resource(row).toArray(),
    };
  }
}

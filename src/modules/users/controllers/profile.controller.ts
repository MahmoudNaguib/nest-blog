import {
  Controller,
  Get,
  Put,
  Post,
  Patch,
  Delete,
  Param,
  Request,
  Body,
} from '@nestjs/common';
/////////////////////////////////////////////////
import { UserService } from '../services/user.service';
import { UserResource } from '../resources/user.resource';
import { UpdateRequest } from '../../users/requests/update.request';
import { ChangePassowrdRequest } from '../requests/change-passowrd.request';
///////////////////////////////////////////////////

@Controller('api/profile')
export class ProfileController {
  constructor(private readonly service: UserService) {}
  @Get('/')
  index(@Request() request) {
    return { data: new UserResource(request.user).toArray() };
  }
  @Patch('edit')
  async edit(@Request() request, @Body() record: UpdateRequest) {
    const row = await this.service.update(request.user.id, record);
    return {
      message: 'Updated successfully',
      data: new UserResource(row).toArray(),
      token: row.token,
    };
  }
  @Put('change-password')
  async ChangePassword(
    @Request() request,
    @Body() record: ChangePassowrdRequest,
  ) {
    const row = await this.service.updatePassword(request.user.id, record);
    return {
      message: 'Password has been changed',
      token: row.token,
    };
  }
}

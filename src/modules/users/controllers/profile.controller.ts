import { Controller, Put, Patch, Request, Body, Get } from '@nestjs/common';
import { EditProfileRequest } from '../requests/profile/edit-profile.request';
import { ChangePassowrdRequest } from '../requests/profile/change-passowrd.request';
import { ProfileService as Service } from '../services/profile.service';
import { UserResource as Resource } from '../resources/user.resource';

@Controller('api/profile')
export class ProfileController {
  constructor(private readonly service: Service) {}

  @Get('/')
  index(@Request() request) {
    return { data: new Resource(request.user).toArray() };
  }

  @Patch('edit')
  async edit(@Request() request, @Body() record: EditProfileRequest) {
    const row = await this.service.editProfile(request.user.id, record);
    return {
      message: 'Updated successfully',
      data: new Resource(row).toArray(),
      token: row.token,
    };
  }

  @Put('change-password')
  async ChangePassword(
    @Request() request,
    @Body() record: ChangePassowrdRequest,
  ) {
    const row = await this.service.changePassword(request.user.id, record);
    return {
      message: 'Password has been changed',
      token: row.token,
    };
  }
}

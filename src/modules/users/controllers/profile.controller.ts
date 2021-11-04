import { Controller, Put, Patch, Request, Body, Get } from '@nestjs/common';
/////////////////////////////////////////////////
import { ProfileService } from '../services/profile.service';
import { UserResource } from '../resources/user.resource';
import { EditProfileRequest } from '../requests/profile/edit-profile.request';
import { ChangePassowrdRequest } from '../requests/profile/change-passowrd.request';

@Controller('api/profile')
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get('/')
  index(@Request() request) {
    return { data: new UserResource(request.user).toArray() };
  }

  @Patch('edit')
  async edit(@Request() request, @Body() record: EditProfileRequest) {
    const row = await this.service.editProfile(request.user.id, record);
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
    const row = await this.service.changePassword(request.user.id, record);
    return {
      message: 'Password has been changed',
      token: row.token,
    };
  }
}

import { Controller, Put, Patch, Request, Body, Get } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
///////////////////////////////////////////////////////////////
import { EditProfileRequest } from '../Requests/profile/EditProfileRequest';
import { ChangePasswordRequest } from '../Requests/profile/ChangePasswordRequest';
import { ProfileService as Service } from '../Services/ProfileService';
import { UserResource as Resource } from '../Resources/UserResource';

@Controller('api/profile')
export class ProfileController {
  constructor(private readonly service: Service) {}

  @Get('/')
  index(@Request() request) {
    return { data: new Resource(request.user).toArray() };
  }

  @Put('edit')
  @FormDataRequest()
  async edit(@Request() request, @Body() record: EditProfileRequest) {
    const row = await this.service.editProfile(request.user.id, record);
    return {
      message: 'Updated successfully',
      data: new Resource(row).toArray(),
      token: row.token,
    };
  }

  @Put('change-password')
  @FormDataRequest()
  async ChangePassword(
    @Request() request,
    @Body() record: ChangePasswordRequest,
  ) {
    const row = await this.service.changePassword(request.user.id, record);
    return {
      message: 'Password has been changed',
      token: row.token,
    };
  }
}

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class EditProfileRequest {
  @MinLength(3)
  name: string;

  @IsEmail()
  @MinLength(5)
  email: string;

  //token?: string;
}

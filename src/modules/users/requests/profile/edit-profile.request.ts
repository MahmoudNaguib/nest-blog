import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { HasMimeType, IsFile, MaxFileSize } from 'nestjs-form-data';
export class EditProfileRequest {
  @MinLength(3)
  name: string;

  @IsEmail()
  @MinLength(5)
  email: string;

  @IsFile()
  @MaxFileSize(4000000, {
    message: 'Max file size is 4MB',
  }) //1e6
  @HasMimeType(['image/jpeg', 'image/png'], {
    message: 'Invalid image format only allowed jpg, png',
  })
  @IsNotEmpty()
  image: any;

  //token?: string;
}

import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';
import { Match } from '../../../../custom-validation/match.decorator';
import { IsUserExist } from '../../../../custom-validation/IsUserExist';

export class RegisterRequest {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUserExist({
    message: 'Field $property value already exists',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Match('password')
  password_confirmation?: string;

  token?: string;
}

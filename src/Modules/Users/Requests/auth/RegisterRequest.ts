import { MinLength, IsEmail } from 'class-validator';
import { Match } from '../../../../CustomValidation/MatchDecorator';
import { IsUserExist } from '../../../../CustomValidation/IsUserExist';

export class RegisterRequest {
  @MinLength(3)
  name: string;

  @IsUserExist({
    message: 'Field $property value already exists',
  })
  @IsEmail()
  @MinLength(5)
  email: string;

  @MinLength(8)
  password: string;

  @Match('password')
  @MinLength(8)
  password_confirmation?: string;

  token?: string;
}

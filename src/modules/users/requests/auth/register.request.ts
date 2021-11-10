import { MinLength, IsEmail } from 'class-validator';
import { Match } from '../../../../custom-validation/match.decorator';
import { IsUserExist } from '../../../../custom-validation/IsUserExist';

export class RegisterRequest {
  @MinLength(3)
  name: string;

  @IsUserExist({
    message: 'Field $property value already exists',
  })
  @IsEmail()
  @MinLength(5)
  email: string;

  @MinLength(5)
  password: string;

  @Match('password')
  @MinLength(5)
  password_confirmation?: string;

  token?: string;
}

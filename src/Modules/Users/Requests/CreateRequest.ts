import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';
import { Match } from '../../../CustomValidation/MatchDecorator';
export class CreateRequest {
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
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

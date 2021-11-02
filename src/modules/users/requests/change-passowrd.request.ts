import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from '../../../custom-validation/match.decorator';
export class ChangePassowrdRequest {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  old_password: string;

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

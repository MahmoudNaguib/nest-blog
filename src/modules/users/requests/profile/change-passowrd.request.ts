import { MinLength } from 'class-validator';
import { Match } from '../../../../custom-validation/match.decorator';
export class ChangePassowrdRequest {
  @MinLength(5)
  old_password: string;

  @MinLength(5)
  password: string;

  @Match('password')
  @MinLength(5)
  password_confirmation?: string;

  // token?: string;
}

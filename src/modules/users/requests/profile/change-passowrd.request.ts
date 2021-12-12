import { MinLength } from 'class-validator';
import { Match } from '../../../../custom-validation/match.decorator';
export class ChangePassowrdRequest {
  @MinLength(8)
  old_password: string;

  @MinLength(8)
  password: string;

  @Match('password')
  @MinLength(8)
  password_confirmation?: string;

  // token?: string;
}

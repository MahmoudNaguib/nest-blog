import { IsNotEmpty, IsString } from 'class-validator';
import { UserModel } from '../../users/models/user.model';
export class CreateRequest {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  user?: UserModel;
}

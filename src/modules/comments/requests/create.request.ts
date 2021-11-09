import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UserModel } from '../../users/models/user.model';
import { PostModel } from '../../posts/models/post.model';
export class CreateRequest {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  post_id: number;

  post?: PostModel;

  user?: UserModel;
}

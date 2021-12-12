import { IsNotEmpty, MinLength } from 'class-validator';
import { UserModel } from '../../users/models/user.model';
import { PostModel } from '../../posts/models/post.model';
import { IsPostExist } from '../../../custom-validation/IsPostExist';
export class CreateRequest {
  @IsPostExist({
    message: 'Post value is not exist',
  })
  @IsNotEmpty()
  post_id: number;

  @MinLength(5)
  @IsNotEmpty()
  content: string;

  post?: PostModel;

  user?: UserModel;
}

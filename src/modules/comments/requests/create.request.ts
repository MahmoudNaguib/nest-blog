import { IsNotEmpty, MinLength } from 'class-validator';
import { UserModel } from '../../users/models/user.model';
import { PostModel } from '../../posts/models/post.model';
import { IsPostExist } from '../../../custom-validation/IsPostExist';
export class CreateRequest {
  @MinLength(5)
  content: string;

  @IsPostExist({
    message: 'Post value is not exist',
  })
  @IsNotEmpty()
  post_id: number;

  post?: PostModel;

  user?: UserModel;
}

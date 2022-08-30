import { IsNotEmpty, MinLength } from 'class-validator';
import { UserModel } from '../../Users/Models/UserModel';
import { PostModel } from '../../Posts/Models/PostModel';
import { IsPostExist } from '../../../CustomValidation/IsPostExist';
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

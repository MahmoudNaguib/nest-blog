import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { SectionModel } from '../../sections/models/section.model';
import { IsSectionExist } from '../../../custom-validation/IsSectionExist';
import { UserModel } from '../../users/models/user.model';
import { PostModel } from '../models/post.model';
export class UpdateRequest {
  @MinLength(5)
  title: string;

  @MinLength(5)
  content: string;

  @IsSectionExist({
    message: 'Section value is not exist',
  })
  @IsNotEmpty()
  section_id: number;

  section?: SectionModel;

  user?: UserModel;
}

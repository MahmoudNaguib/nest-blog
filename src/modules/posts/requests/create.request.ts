import { IsNotEmpty, IsString, IsNumber, MinLength } from 'class-validator';
import { UserModel } from '../../users/models/user.model';
import { SectionModel } from '../../sections/models/section.model';
import { IsSectionExist } from '../../../custom-validation/IsSectionExist';

export class CreateRequest {
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

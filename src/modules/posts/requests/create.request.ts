import { IsNotEmpty, IsString, IsNumber, MinLength } from 'class-validator';
import { UserModel } from '../../users/models/user.model';
import { SectionModel } from '../../sections/models/section.model';
import { IsSectionExist } from '../../../custom-validation/IsSectionExist';

export class CreateRequest {
  @MinLength(10, {
    message: `$property must be min length string $constraint1`,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsSectionExist({
    message: 'Field $property value is not exists',
  })
  @IsNumber()
  @IsNotEmpty()
  section_id: number;

  section?: SectionModel;

  user?: UserModel;
}

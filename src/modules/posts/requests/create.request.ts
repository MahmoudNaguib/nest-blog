import { IsNotEmpty, IsString, IsNumber, MinLength } from 'class-validator';
import { UserModel } from '../../users/models/user.model';
import { SectionModel } from '../../sections/models/section.model';
import { IsSectionExist } from '../../../custom-validation/IsSectionExist';
import { HasMimeType, IsFile, MaxFileSize } from 'nestjs-form-data';

export class CreateRequest {
  @IsSectionExist({
    message: 'Section value is not exist',
  })
  @IsNotEmpty()
  section_id: number;

  @MinLength(5)
  @IsNotEmpty()
  title: string;

  @MinLength(5)
  @IsNotEmpty()
  content: string;

  @IsFile()
  @MaxFileSize(4000000, {
    message: 'Max file size is 4MB',
  }) //1e6
  @HasMimeType(['image/jpeg', 'image/png'], {
    message: 'Invalid image format only allowed jpg, png',
  })
  @IsNotEmpty()
  image: any;
  //image: FileSystemStoredFile;

  section?: SectionModel;

  user?: UserModel;
}

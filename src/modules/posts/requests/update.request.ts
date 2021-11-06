import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { SectionModel } from '../../sections/models/section.model';
export class UpdateRequest {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  section: SectionModel;
}

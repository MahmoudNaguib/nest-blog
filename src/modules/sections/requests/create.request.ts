import { IsNotEmpty, IsString } from 'class-validator';
export class CreateRequest {
  @IsNotEmpty()
  @IsString()
  title: string;
}

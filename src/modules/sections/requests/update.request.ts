import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateRequest {
  @IsNotEmpty()
  @IsString()
  title: string;
}

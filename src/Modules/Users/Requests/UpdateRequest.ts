import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class UpdateRequest {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  token?: string;
}

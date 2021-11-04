import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';
export class LoginRequest {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
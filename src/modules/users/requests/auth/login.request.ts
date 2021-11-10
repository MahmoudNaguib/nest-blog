import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';
export class LoginRequest {
  @IsEmail()
  @MinLength(5)
  email: string;

  @MinLength(5)
  password: string;
}

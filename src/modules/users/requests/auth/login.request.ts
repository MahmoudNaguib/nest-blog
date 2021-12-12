import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';
export class LoginRequest {
  @IsEmail()
  @MinLength(5)
  email: string;

  @MinLength(8)
  password: string;
}

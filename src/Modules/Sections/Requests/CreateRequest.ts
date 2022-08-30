import { MinLength } from 'class-validator';
export class CreateRequest {
  @MinLength(3)
  title: string;
}

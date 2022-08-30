import { MinLength } from 'class-validator';
export class UpdateRequest {
  @MinLength(3)
  title: string;
}

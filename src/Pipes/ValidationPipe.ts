import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CustomValidationException } from '../Exceptions/CustomValidation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const customErrors = {};
      for (let i = 0; i < errors.length; i++) {
        if (errors[i].constraints != undefined) {
          customErrors[errors[i].property] = Object.values(
            errors[i].constraints,
          ).join(', ');
        }
      }
      throw new CustomValidationException(customErrors);
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { getRepository } from 'typeorm';
import { PostModel } from '../Modules/Posts/Models/PostModel';

/*
Usage
@IsPostExist({
    message: 'Post value is not exist',
  })
*/

@ValidatorConstraint({ async: true })
export class IsPostExistConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return getRepository(PostModel)
      .findOne(value)
      .then((record) => {
        if (record) return true;
        return false;
      });
  }
}

export function IsPostExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPostExistConstraint,
    });
  };
}

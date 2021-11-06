import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { getRepository } from 'typeorm';
import { SectionModel } from '../modules/sections/models/section.model';

/*
Usage
@IsSectionExist({
    message: '$property value already exists',
  })
*/

@ValidatorConstraint({ async: true })
export class IsSectionExistConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return getRepository(SectionModel)
      .findOne(value)
      .then((record) => {
        if (record) return true;
        return false;
      });
  }
}

export function IsSectionExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsSectionExistConstraint,
    });
  };
}

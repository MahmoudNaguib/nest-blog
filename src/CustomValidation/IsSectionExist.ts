import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { getRepository } from 'typeorm';
import { SectionModel } from '../Modules/Sections/Models/SectionModel';

/*
Usage
@IsSectionExist({
    message: 'Section value is not exist',
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

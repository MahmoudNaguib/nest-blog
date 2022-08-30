import { HttpException } from '@nestjs/common';

export class CustomValidationException extends HttpException {
  public errors;
  constructor(errors: any) {
    super(
      {
        statusCode: 422,
        message: 'Validation error',
        errors: errors,
      },
      422,
    );
  }
}

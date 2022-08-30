import { HttpException } from '@nestjs/common';

export class CustomUnAuthorizedException extends HttpException {
  constructor() {
    super(
      {
        statusCode: 401,
        message: 'Unauthorized User',
      },
      401,
    );
  }
}

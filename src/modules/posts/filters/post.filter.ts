import { Request } from '@nestjs/common';
import { BaseFilter } from '../../../filters/base.filter';
export class PostFilter extends BaseFilter {
  public filterFields = {};
  constructor(@Request() request) {
    super();
    const queryParameters = request.query;
    if (queryParameters) {
      const excepted = this.excepted;
      for (const key in queryParameters) {
        if (!excepted.includes(key)) {
          //////////////// Do your logic
          this.filterFields[key] = queryParameters[key];
          /////////////////////////////
        }
      }
    }
  }
}

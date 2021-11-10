import { Request } from '@nestjs/common';
export class RequestQueryRequest {
  public page;
  public limit;
  public orderField;
  public filterFields = {};
  constructor(@Request() request) {
    this.page = request.query.hasOwnProperty('page') ? request.query.page : 1;
    this.limit = request.query.hasOwnProperty('limit')
      ? request.query.limit
      : 2;
    const orderBy = request.query.hasOwnProperty('orderBy')
      ? request.query.orderBy
      : 'id';
    const orderType = request.query.hasOwnProperty('orderType')
      ? request.query.orderType
      : 'Desc';
    this.orderField = { [orderBy]: orderType };
    //////////////////////////////
    const queryParameters = request.query;
    if (queryParameters) {
      const excepted = ['page', 'limit', 'orderBy', 'orderType'];
      for (const key in queryParameters) {
        if (!excepted.includes(key)) {
          this.filterFields[key] = queryParameters[key];
        }
      }
    }

    //////////////////////////////
  }
}

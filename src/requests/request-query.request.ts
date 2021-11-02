import { Injectable, NotFoundException, Request } from '@nestjs/common';
export class RequestQueryRequest {
  public page;
  public limit;
  public orderField;
  constructor(@Request() request) {
    this.page = request.query.hasOwnProperty('page') ? request.query.page : 1;
    this.limit = request.query.hasOwnProperty('limit')
      ? request.query.limit
      : 10;
    const orderBy = request.query.hasOwnProperty('orderBy')
      ? request.query.orderBy
      : 'id';
    const orderType = request.query.hasOwnProperty('orderType')
      ? request.query.orderType
      : 'Desc';
    this.orderField = { [orderBy]: orderType };
    /*
    //////////////////// Delete reserved keys;
    delete request.query.page;
    delete request.query.limit;
    delete request.query.orderBy;
    delete request.query.orderType;
    /////////////////////////
    this.params = request.query;
*/
  }
}

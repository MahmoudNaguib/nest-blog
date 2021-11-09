import { Request } from '@nestjs/common';
export class BaseFilter {
  public excepted = ['page', 'limit', 'orderBy', 'orderType'];
}

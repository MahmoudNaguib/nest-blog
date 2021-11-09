import { PaginationResultInterface } from './pagination.results.interface';

export class Pagination<PaginationEntity> {
  public data: any[];
  /////////////////////////// other fields
  public meta: {
    current_page?: number;
    per_page?: number;
    total?: number;
    resource?: string;
    page_total?: number;
  };

  public links: {
    next?: string;
    previous?: string;
  };

  constructor(
    paginationResults: PaginationResultInterface<PaginationEntity>,
    request?: any,
  ) {
    this.data = paginationResults.results;
    this.meta = {
      total: paginationResults.meta.total,
      current_page: parseInt(paginationResults.meta.current_page.toString()),
      per_page: parseInt(paginationResults.meta.per_page.toString()),
      resource: paginationResults.meta.resource,
      page_total: paginationResults.results.length,
    };

    const prevPage = parseInt(this.meta.current_page.toString()) - 1;
    let nextPage;
    if (
      this.meta.total >
      parseInt(this.meta.per_page.toString()) *
        parseInt(this.meta.current_page.toString())
    ) {
      nextPage = parseInt(this.meta.current_page.toString()) + 1;
    } else {
      nextPage = 0;
    }
    /*if (!request) {
      const nextValue =
        nextPage != 0 ? this.meta.resource + '?page=' + nextPage : null;
      const prevValue =
        prevPage > 0 ? this.meta.resource + '?page=' + prevPage : null;
    } else {
      const queryParameters = request.query;
      if (queryParameters) {
        const excepted = ['page', 'limit', 'orderBy', 'orderType'];
        const filterFields = {};
        for (const key in queryParameters) {
          if (!excepted.includes(key)) {
            //////////////// Do your logic
            filterFields[key] = queryParameters[key];
            /////////////////////////////
          }
        }
      }
    }*/
    const nextValue =
      nextPage != 0 ? this.meta.resource + '?page=' + nextPage : null;
    const prevValue =
      prevPage > 0 ? this.meta.resource + '?page=' + prevPage : null;

    this.links = {
      previous: prevValue,
      next: nextValue,
    };
  }
}

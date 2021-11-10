export class Pagination<PaginationEntity> {
  public data: any[];
  /////////////////////////// other fields
  public meta: {
    current_page?: number;
    per_page?: number;
    total?: number;
    page_total?: number;
    from?: number;
    to?: number;
    last_page?: number;
  };

  constructor(paginationResults, request?: any) {
    this.data = paginationResults.results;
    const total = paginationResults.meta.total;
    const current_page = parseInt(
      paginationResults.meta.current_page.toString(),
    );
    const per_page = parseInt(paginationResults.meta.per_page.toString());
    const page_total = paginationResults.results.length;
    const from = (current_page - 1) * per_page + 1;
    const to = from + page_total - 1;
    const last_page = Math.ceil(total / per_page);
    this.meta = {
      total: total,
      current_page: current_page,
      per_page: per_page,
      page_total: page_total,
      from: from,
      to: to,
      last_page: last_page,
    };
  }
}

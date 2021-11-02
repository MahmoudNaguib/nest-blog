export interface PaginationResultInterface<PaginationEntity> {
  results: PaginationEntity[];
  meta?: {
    current_page?: number;
    per_page?: number;
    total: number;
    resource?: string;
    page_total?: number;
  };
  links?: {
    next?: string;
    previous?: string;
  };
}

export interface FilterOptions {
  type?: 'Arabic' | 'Robusta';
}

export interface PaginationOptions extends FilterOptions {
  page: number;
  limit: number;
  offset?: number;
}

export interface PaginationResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

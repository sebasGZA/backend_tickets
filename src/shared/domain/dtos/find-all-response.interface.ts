export interface FindAllResponseDto<T> {
  data: T[];
  total: number;
  totalPages?: number;
  currentPage?: number;
}

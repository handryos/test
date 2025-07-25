import {
  PaginationOptions,
  PaginationResult,
} from '../../../@shared/@pagination';

export interface IBaseRepository<T, TCreate, TUpdate> {
  findAll(options?: PaginationOptions): Promise<T[] | PaginationResult<T>>;
  findById(id: number): Promise<T | null>;
  create(data: TCreate): Promise<T>;
  update(id: number, data: TUpdate): Promise<T | null>;
  delete(id: number): Promise<boolean>;
}

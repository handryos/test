export interface IBaseRepository<T, TCreate, TUpdate, K> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  findByUniqueRef(uniqueRef: K): Promise<T | null>;
  create(data: TCreate): Promise<T>;
  update(id: number, data: TUpdate): Promise<T | null>;
  delete(id: number): Promise<boolean>;
}

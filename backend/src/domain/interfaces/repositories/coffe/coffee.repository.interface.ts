import {
  CoffeeEntity,
  CoffeeCreateModel,
  CoffeeUpdateModel,
  CoffeeModelUniqRef,
} from '../../../models/coffe';
import { IBaseRepository } from '../base-repository-interface';

export type ICoffeeRepository = IBaseRepository<
  CoffeeEntity,
  CoffeeCreateModel,
  CoffeeUpdateModel,
  CoffeeModelUniqRef
>;

export interface CoffeeRepository extends ICoffeeRepository {
  findByName(name: string): Promise<CoffeeEntity | null>;
  findByType(type: string): Promise<CoffeeEntity[]>;
}

export * from './coffee.repository.token';

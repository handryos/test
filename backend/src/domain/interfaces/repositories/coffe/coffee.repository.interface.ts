import {
  CoffeeEntity,
  CoffeeCreateModel,
  CoffeeUpdateModel,
} from '../../../models/coffee';
import { IBaseRepository } from '../base-repository-interface';

export type ICoffeeRepository = IBaseRepository<
  CoffeeEntity,
  CoffeeCreateModel,
  CoffeeUpdateModel
>;

export interface CoffeeRepository extends ICoffeeRepository {
  findByName(name: string): Promise<CoffeeEntity | null>;
}

export * from './coffee.repository.token';

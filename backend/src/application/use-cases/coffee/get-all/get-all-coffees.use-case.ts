import { CoffeeRepository } from '../../../../domain/interfaces/repositories/coffe/coffee.repository.interface';
import { CoffeeEntity } from '../../../../domain/entities/coffee/coffee.entity';
import {
  PaginationOptions,
  PaginationResult,
} from '../../../../@shared/@pagination';

export class GetAllCoffeesUseCase {
  constructor(private readonly coffeeRepository: CoffeeRepository) {}

  async execute(
    options?: PaginationOptions,
  ): Promise<CoffeeEntity[] | PaginationResult<CoffeeEntity>> {
    return await this.coffeeRepository.findAll(options);
  }
}

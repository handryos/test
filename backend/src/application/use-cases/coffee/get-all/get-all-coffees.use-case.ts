import { CoffeeRepository } from '../../../../domain/interfaces/repositories/coffe/coffee.repository.interface';
import { CoffeeEntity } from '../../../../domain/entities/coffee/coffee.entity';
import {
  PaginationOptions,
  PaginationResult,
  FilterOptions,
} from '../../../../@shared/@pagination';

export class GetAllCoffeesUseCase {
  constructor(private readonly coffeeRepository: CoffeeRepository) {}

  async execute(
    options?: PaginationOptions | FilterOptions,
  ): Promise<CoffeeEntity[] | PaginationResult<CoffeeEntity>> {
    const result = await this.coffeeRepository.findAll(options);

    const mapEntity = (entity: any): CoffeeEntity => ({
      ...entity,
      type: entity.type === 'Arabic' ? 'Arabic' : 'Robusta',
    });

    if (Array.isArray(result)) {
      return result.map(mapEntity);
    } else {
      return {
        ...result,
        data: (result as any).data
          ? (result as any).data.map(mapEntity)
          : [],
      };
    }
  }
}

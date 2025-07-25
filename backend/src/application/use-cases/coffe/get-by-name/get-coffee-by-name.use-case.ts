import { CoffeeRepository } from '../../../../domain/interfaces/repositories/coffe/coffee.repository.interface';
import { CoffeeEntity } from '../../../../domain/entities/coffe/coffee.entity';

export class GetCoffeeByNameUseCase {
  constructor(
    private readonly coffeeRepository: CoffeeRepository,
  ) {}

  async execute(name: string): Promise<CoffeeEntity | null> {
    return await this.coffeeRepository.findByName(name);
  }
}

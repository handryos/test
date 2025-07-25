import { CoffeeRepository } from '../../../../domain/interfaces/repositories/coffe/coffee.repository.interface';
import { CoffeeEntity } from '../../../../domain/entities/coffe/coffee.entity';

export class GetAllCoffeesUseCase {
  constructor(
    private readonly coffeeRepository: CoffeeRepository,
  ) {}

  async execute(): Promise<CoffeeEntity[]> {
    return await this.coffeeRepository.findAll();
  }
}

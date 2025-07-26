import { CoffeeRepository } from '../../../../domain/interfaces/repositories/coffe/coffee.repository.interface';
import { CoffeeEntity } from '../../../../domain/entities/coffee/coffee.entity';

export class GetCoffeeByIdUseCase {
  constructor(
    private readonly coffeeRepository: CoffeeRepository,
  ) {}

  async execute(id: number): Promise<CoffeeEntity | null> {
    return await this.coffeeRepository.findById(id);
  }
}

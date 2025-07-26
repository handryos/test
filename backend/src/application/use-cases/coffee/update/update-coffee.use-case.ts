import { CoffeeRepository } from '../../../../domain/interfaces/repositories/coffe/coffee.repository.interface';
import { UpdateCoffeeDto } from '../../../../@shared/@dtos/coffee.dto';
import { CoffeeEntity } from '../../../../domain/entities/coffee/coffee.entity';
import { CoffeeDomainService } from '../../../../domain/services/coffe/coffee.service';

export class UpdateCoffeeUseCase {
  constructor(
    private readonly coffeeRepository: CoffeeRepository,
    private readonly coffeeDomainService: CoffeeDomainService,
  ) {}

  async execute(
    id: number,
    coffeeData: UpdateCoffeeDto,
  ): Promise<CoffeeEntity | null> {
    if (coffeeData.name) {
      await this.coffeeDomainService.validateUniqueNameForUpdate(
        id,
        coffeeData.name,
      );
    }

    return await this.coffeeRepository.update(id, coffeeData);
  }
}

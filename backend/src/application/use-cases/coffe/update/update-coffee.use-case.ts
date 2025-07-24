import { Inject, Injectable } from '@nestjs/common';
import { CoffeeRepository } from '../../../../domain/interfaces/repositories/coffe/coffee.repository.interface';
import { COFFEE_REPOSITORY_TOKEN } from '../../../../domain/interfaces/repositories/coffe/coffee.repository.token';
import { UpdateCoffeeDto } from '../../../../@shared/@dtos/coffee.dto';
import { CoffeeEntity } from '../../../../domain/entities/coffe/coffee.entity';
import { CoffeeDomainService } from '../../../../domain/services/coffe/coffee.service';

@Injectable()
export class UpdateCoffeeUseCase {
  constructor(
    @Inject(COFFEE_REPOSITORY_TOKEN)
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

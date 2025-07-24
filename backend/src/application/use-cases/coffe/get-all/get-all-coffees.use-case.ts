import { Inject, Injectable } from '@nestjs/common';
import { CoffeeRepository } from '../../../../domain/interfaces/repositories/coffe/coffee.repository.interface';
import { COFFEE_REPOSITORY_TOKEN } from '../../../../domain/interfaces/repositories/coffe/coffee.repository.token';
import { CoffeeEntity } from '../../../../domain/entities/coffe/coffee.entity';

@Injectable()
export class GetAllCoffeesUseCase {
  constructor(
    @Inject(COFFEE_REPOSITORY_TOKEN)
    private readonly coffeeRepository: CoffeeRepository,
  ) {}

  async execute(): Promise<CoffeeEntity[]> {
    return await this.coffeeRepository.findAll();
  }
}

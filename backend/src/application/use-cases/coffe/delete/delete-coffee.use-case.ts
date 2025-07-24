import { Inject, Injectable } from '@nestjs/common';
import { CoffeeRepository } from '../../../../domain/interfaces/repositories/coffe/coffee.repository.interface';
import { COFFEE_REPOSITORY_TOKEN } from '../../../../domain/interfaces/repositories/coffe/coffee.repository.token';

@Injectable()
export class DeleteCoffeeUseCase {
  constructor(
    @Inject(COFFEE_REPOSITORY_TOKEN)
    private readonly coffeeRepository: CoffeeRepository,
  ) {}

  async execute(id: number): Promise<boolean> {
    return await this.coffeeRepository.delete(id);
  }
}

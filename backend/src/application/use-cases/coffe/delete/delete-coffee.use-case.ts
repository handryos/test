import { Injectable } from '@nestjs/common';
import { CoffeeRepository } from '../../../../domain/interfaces/repositories/coffe/coffee.repository.interface';

@Injectable()
export class DeleteCoffeeUseCase {
  constructor(private readonly coffeeRepository: CoffeeRepository) {}

  async execute(id: number): Promise<boolean> {
    return await this.coffeeRepository.delete(id);
  }
}

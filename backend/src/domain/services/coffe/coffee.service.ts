import { Injectable } from '@nestjs/common';
import { CoffeeRepository } from '../../interfaces/repositories/coffe/coffee.repository.interface';
import { DomainError } from '../../models/@shared/domain-error';

@Injectable()
export class CoffeeDomainService {
  constructor(private readonly coffeeRepository: CoffeeRepository) {}

  async validateUniqueNameForCreation(name: string): Promise<void> {
    const existingCoffee = await this.coffeeRepository.findByName(name);
    if (existingCoffee) {
      throw new DomainError(`Coffee with name '${name}' already exists`);
    }
  }

  async validateUniqueNameForUpdate(id: number, name: string): Promise<void> {
    const existingCoffee = await this.coffeeRepository.findByName(name);
    if (existingCoffee && existingCoffee.id !== id) {
      throw new DomainError(`Coffee with name '${name}' already exists`);
    }
  }
}

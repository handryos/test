import { CoffeeRepository } from '../../../../domain/interfaces/repositories/coffe/coffee.repository.interface';
import {
  CoffeeEntity,
  CoffeeCreateModel,
} from '../../../../domain/models/coffe';
import { CreateCoffeeDto } from '../../../../@shared/@dtos/coffee.dto';
import { CoffeeDomainService } from '../../../../domain/services/coffe/coffee.service';

export class CreateCoffeeUseCase {
  constructor(
    private readonly coffeeRepository: CoffeeRepository,
    private readonly coffeeDomainService: CoffeeDomainService,
  ) {}

  async execute(coffeeData: CreateCoffeeDto): Promise<CoffeeEntity> {
    await this.coffeeDomainService.validateUniqueNameForCreation(
      coffeeData.name,
    );

    const createModel: CoffeeCreateModel = {
      name: coffeeData.name,
      description: coffeeData.description,
      type: coffeeData.type,
      price: coffeeData.price,
      image_url: coffeeData.image_url,
    };

    return await this.coffeeRepository.create(createModel);
  }
}

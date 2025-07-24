import { Injectable } from '@nestjs/common';
import { CoffeeRepository } from '../../../domain/interfaces/repositories/coffe/coffee.repository.interface';
import {
  CoffeeEntity,
  CoffeeCreateModel,
  CoffeeUpdateModel,
  CoffeeModelUniqRef,
} from '../../../domain/models/coffe';
import { CoffeeModel } from './coffee.model';

@Injectable()
export class SequelizeCoffeeRepository implements CoffeeRepository {
  async findAll(): Promise<CoffeeEntity[]> {
    const coffees = await CoffeeModel.findAll();
    return coffees.map((coffee) => this.toDomain(coffee));
  }

  async findById(id: number): Promise<CoffeeEntity | null> {
    const coffee = await CoffeeModel.findByPk(id);
    if (!coffee) {
      return null;
    }
    return this.toDomain(coffee);
  }

  async findByName(name: string): Promise<CoffeeEntity | null> {
    const coffee = await CoffeeModel.findOne({
      where: { name },
    });
    return coffee ? this.toDomain(coffee) : null;
  }

  async findByType(type: string): Promise<CoffeeEntity[]> {
    const coffees = await CoffeeModel.findAll({
      where: { type },
    });
    return coffees.map((coffee) => this.toDomain(coffee));
  }

  async create(coffeeData: CoffeeCreateModel): Promise<CoffeeEntity> {
    const coffee = await CoffeeModel.create({
      name: coffeeData.name,
      description: coffeeData.description,
      type: coffeeData.type,
      price: coffeeData.price,
      imageUrl: coffeeData.imageUrl,
    });
    return this.toDomain(coffee);
  }

  async update(
    id: number,
    coffeeData: CoffeeUpdateModel,
  ): Promise<CoffeeEntity | null> {
    const [affectedRows] = await CoffeeModel.update(coffeeData, {
      where: { id },
    });

    if (affectedRows === 0) {
      return null;
    }

    const updatedCoffee = await CoffeeModel.findByPk(id);
    return updatedCoffee ? this.toDomain(updatedCoffee) : null;
  }

  async delete(id: number): Promise<boolean> {
    const affectedRows = await CoffeeModel.destroy({
      where: { id },
    });
    return affectedRows > 0;
  }

  private toDomain(coffeeModel: CoffeeModel): CoffeeEntity {
    return CoffeeEntity.create(
      coffeeModel.id,
      coffeeModel.name,
      coffeeModel.description,
      coffeeModel.type,
      coffeeModel.price,
      coffeeModel.imageUrl,
      coffeeModel.createdAt,
      coffeeModel.updatedAt,
    );
  }
}

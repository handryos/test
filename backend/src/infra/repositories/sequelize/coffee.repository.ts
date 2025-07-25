import { Injectable } from '@nestjs/common';
import { CoffeeRepository } from '../../../domain/interfaces/repositories/coffe/coffee.repository.interface';
import {
  CoffeeEntity,
  CoffeeCreateModel,
  CoffeeUpdateModel,
} from '../../../domain/models/coffe';
import { CoffeeModel } from './coffee.model';
import {
  PaginationOptions,
  PaginationResult,
} from '../../../@shared/@pagination';

@Injectable()
export class SequelizeCoffeeRepository implements CoffeeRepository {
  async findAll(
    options?: PaginationOptions,
  ): Promise<CoffeeEntity[] | PaginationResult<CoffeeEntity>> {
    if (!options) {
      const coffees = await CoffeeModel.findAll();
      return coffees.map((coffee) => this.toDomain(coffee));
    }

    const { page, limit } = options;
    const offset = options.offset ?? (page - 1) * limit;

    const { count, rows } = await CoffeeModel.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    const data = rows.map((coffee) => this.toDomain(coffee));
    const totalPages = Math.ceil(count / limit);

    return {
      data,
      meta: {
        page,
        limit,
        total: count,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
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

  async create(coffeeData: CoffeeCreateModel): Promise<CoffeeEntity> {
    const coffee = await CoffeeModel.create({
      name: coffeeData.name,
      description: coffeeData.description,
      type: coffeeData.type,
      price: coffeeData.price,
      image_url: coffeeData.image_url,
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
      coffeeModel.image_url,
      coffeeModel.createdAt,
      coffeeModel.updatedAt,
    );
  }
}

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpStatus,
  HttpException,
  BadRequestException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import {
  CoffeeResponseDto,
  CreateCoffeeDto,
  UpdateCoffeeDto,
} from 'src/@shared/@dtos';
import {
  CreateCoffeeUseCase,
  DeleteCoffeeUseCase,
  GetAllCoffeesUseCase,
  GetCoffeeByIdUseCase,
  UpdateCoffeeUseCase,
} from 'src/application/use-cases/coffe';
import { GetCoffeeByNameUseCase } from 'src/application/use-cases/coffe/get-by-name';
import { DomainError } from 'src/domain/models/@shared/domain-error';
import {
  CREATE_COFFEE_USE_CASE,
  GET_ALL_COFFEES_USE_CASE,
  GET_COFFEE_BY_ID_USE_CASE,
  GET_COFFEE_BY_NAME_USE_CASE,
  UPDATE_COFFEE_USE_CASE,
  DELETE_COFFEE_USE_CASE,
} from 'src/modules/coffe/use-case.tokens';

@Controller('coffees')
export class CoffeeController {
  constructor(
    @Inject(CREATE_COFFEE_USE_CASE)
    private readonly createCoffeeUseCase: CreateCoffeeUseCase,
    @Inject(GET_ALL_COFFEES_USE_CASE)
    private readonly getAllCoffeesUseCase: GetAllCoffeesUseCase,
    @Inject(GET_COFFEE_BY_ID_USE_CASE)
    private readonly getCoffeeByIdUseCase: GetCoffeeByIdUseCase,
    @Inject(GET_COFFEE_BY_NAME_USE_CASE)
    private readonly getCoffeeByNameUseCase: GetCoffeeByNameUseCase,
    @Inject(UPDATE_COFFEE_USE_CASE)
    private readonly updateCoffeeUseCase: UpdateCoffeeUseCase,
    @Inject(DELETE_COFFEE_USE_CASE)
    private readonly deleteCoffeeUseCase: DeleteCoffeeUseCase,
  ) {}

  @Get()
  async findAll(): Promise<CoffeeResponseDto[]> {
    const coffees = await this.getAllCoffeesUseCase.execute();
    return coffees.map((coffee) => ({
      id: coffee.id,
      name: coffee.name,
      description: coffee.description,
      type: coffee.type,
      price: coffee.price,
      imageUrl: coffee.imageUrl,
      createdAt: coffee.createdAt!,
      updatedAt: coffee.updatedAt!,
    }));
  }

  @Get('by-name/:name')
  async findByName(
    @Param('name') name: string,
  ): Promise<CoffeeResponseDto | null> {
    const coffee = await this.getCoffeeByNameUseCase.execute(name);
    if (!coffee) {
      return null;
    }
    return {
      id: coffee.id,
      name: coffee.name,
      description: coffee.description,
      type: coffee.type,
      price: coffee.price,
      imageUrl: coffee.imageUrl,
      createdAt: coffee.createdAt!,
      updatedAt: coffee.updatedAt!,
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CoffeeResponseDto> {
    const coffee = await this.getCoffeeByIdUseCase.execute(id);
    if (!coffee) {
      throw new NotFoundException('Coffee not found');
    }
    return {
      id: coffee.id,
      name: coffee.name,
      description: coffee.description,
      type: coffee.type,
      price: coffee.price,
      imageUrl: coffee.imageUrl,
      createdAt: coffee.createdAt!,
      updatedAt: coffee.updatedAt!,
    };
  }

  @Post()
  async create(
    @Body() createCoffeeDto: CreateCoffeeDto,
  ): Promise<CoffeeResponseDto> {
    try {
      const coffee = await this.createCoffeeUseCase.execute(createCoffeeDto);
      return {
        id: coffee.id,
        name: coffee.name,
        description: coffee.description,
        type: coffee.type,
        price: coffee.price,
        imageUrl: coffee.imageUrl,
        createdAt: coffee.createdAt!,
        updatedAt: coffee.updatedAt!,
      };
    } catch (error) {
      if (error instanceof DomainError) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ): Promise<CoffeeResponseDto> {
    try {
      const coffee = await this.updateCoffeeUseCase.execute(
        id,
        updateCoffeeDto,
      );
      if (!coffee) {
        throw new HttpException('Coffee not found', HttpStatus.NOT_FOUND);
      }
      return {
        id: coffee.id,
        name: coffee.name,
        description: coffee.description,
        type: coffee.type,
        price: coffee.price,
        imageUrl: coffee.imageUrl,
        createdAt: coffee.createdAt!,
        updatedAt: coffee.updatedAt!,
      };
    } catch (error) {
      if (error instanceof DomainError) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    const success = await this.deleteCoffeeUseCase.execute(id);
    if (!success) {
      throw new HttpException('Coffee not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Coffee deleted successfully' };
  }
}

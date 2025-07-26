import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpStatus,
  HttpException,
  BadRequestException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
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
} from 'src/application/use-cases/coffee';
import { GetCoffeeByNameUseCase } from 'src/application/use-cases/coffee/get-by-name';
import { DomainError } from 'src/domain/models/@shared/domain-error';
import {
  CREATE_COFFEE_USE_CASE,
  GET_ALL_COFFEES_USE_CASE,
  GET_COFFEE_BY_ID_USE_CASE,
  GET_COFFEE_BY_NAME_USE_CASE,
  UPDATE_COFFEE_USE_CASE,
  DELETE_COFFEE_USE_CASE,
} from 'src/modules/coffee/use-case.tokens';

@ApiTags('coffees')
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
  @ApiOperation({
    summary: 'Get all coffees',
    description:
      'Retrieve all coffees with optional pagination for infinite scroll',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (starts from 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page (1-100)',
    example: 10,
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Number of items to skip',
    example: 0,
  })
  @ApiResponse({
    status: 200,
    description: 'List of coffees retrieved successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid pagination parameters',
  })
  async findAll(@Query() query: any) {
    const page = query.page ? parseInt(query.page, 10) : undefined;
    const limit = query.limit ? parseInt(query.limit, 10) : undefined;
    const offset = query.offset ? parseInt(query.offset, 10) : undefined;

    if (page && page < 1) {
      throw new BadRequestException('Page must be greater than 0');
    }
    if (limit && (limit < 1 || limit > 100)) {
      throw new BadRequestException('Limit must be between 1 and 100');
    }

    const options = page && limit ? { page, limit, offset } : undefined;

    const result = await this.getAllCoffeesUseCase.execute(options);

    if (Array.isArray(result)) {
      return result.map((coffee) => ({
        id: coffee.id,
        name: coffee.name,
        description: coffee.description,
        type: coffee.type,
        price: coffee.price,
        image_url: coffee.image_url,
        createdAt: coffee.createdAt!,
        updatedAt: coffee.updatedAt!,
      }));
    }

    return {
      data: result.data.map((coffee) => ({
        id: coffee.id,
        name: coffee.name,
        description: coffee.description,
        type: coffee.type,
        price: coffee.price,
        image_url: coffee.image_url,
        createdAt: coffee.createdAt!,
        updatedAt: coffee.updatedAt!,
      })),
      meta: result.meta,
    };
  }

  @Get('by-name/:name')
  @ApiOperation({
    summary: 'Get coffee by name',
    description: 'Retrieve a specific coffee by its name',
  })
  @ApiParam({
    name: 'name',
    description: 'Coffee name',
    type: 'string',
    example: 'Espresso',
  })
  @ApiResponse({
    status: 200,
    description: 'Coffee found successfully',
    type: CoffeeResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Coffee not found',
  })
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
      image_url: coffee.image_url,
      createdAt: coffee.createdAt!,
      updatedAt: coffee.updatedAt!,
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get coffee by ID',
    description: 'Retrieve a specific coffee by its unique identifier',
  })
  @ApiParam({
    name: 'id',
    description: 'Coffee ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Coffee found successfully',
    type: CoffeeResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Coffee not found',
  })
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
      image_url: coffee.image_url,
      createdAt: coffee.createdAt!,
      updatedAt: coffee.updatedAt!,
    };
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new coffee',
    description: 'Create a new coffee with validation for duplicate names',
  })
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({
    status: 201,
    description: 'Coffee created successfully',
    type: CoffeeResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input or coffee name already exists',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - JWT token required',
  })
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
        image_url: coffee.image_url,
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
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update coffee',
    description: 'Update an existing coffee by ID. Requires authentication.',
  })
  @ApiParam({
    name: 'id',
    description: 'Coffee ID to update',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Coffee updated successfully',
    type: CoffeeResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing authentication token',
  })
  @ApiResponse({
    status: 404,
    description: 'Coffee not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data',
  })
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
        image_url: coffee.image_url,
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
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Delete coffee',
    description: 'Delete a coffee by ID. Requires authentication.',
  })
  @ApiParam({
    name: 'id',
    description: 'Coffee ID to delete',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Coffee deleted successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or missing authentication token',
  })
  @ApiResponse({
    status: 404,
    description: 'Coffee not found',
  })
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

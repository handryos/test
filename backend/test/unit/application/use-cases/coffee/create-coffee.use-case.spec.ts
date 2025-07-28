import { CreateCoffeeUseCase } from '../../../../../src/application/use-cases/coffee/create/create-coffee.use-case';
import { CoffeeRepository } from '../../../../../src/domain/interfaces/repositories/coffe/coffee.repository.interface';
import { CreateCoffeeDto } from '../../../../../src/@shared/@dtos/coffee.dto';
import { CoffeeEntity } from '../../../../../src/domain/entities/coffee/coffee.entity';
import { CoffeeCreateModel } from '../../../../../src/domain/models/coffee';
import { DomainError } from '../../../../../src/domain/models/@shared/domain-error';

describe('CreateCoffeeUseCase', () => {
  let createCoffeeUseCase: CreateCoffeeUseCase;
  let mockCoffeeRepository: jest.Mocked<CoffeeRepository>;
  let mockCoffeeDomainService: any;

  const mockCoffee = new CoffeeEntity(
    1,
    'Test Coffee',
    'Test Description',
    'Arabic',
    5.99,
    'http://example.com/coffee.jpg',
    new Date(),
    new Date(),
  );

  beforeEach(() => {
    mockCoffeeRepository = {
      findByName: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    };

    mockCoffeeDomainService = {
      validateUniqueNameForCreation: jest.fn(),
      validateUniqueNameForUpdate: jest.fn(),
    };

    createCoffeeUseCase = new CreateCoffeeUseCase(
      mockCoffeeRepository,
      mockCoffeeDomainService,
    );

    jest.clearAllMocks();
  });

  describe('execute', () => {
    const createCoffeeDto: CreateCoffeeDto = {
      name: 'New Coffee',
      description: 'A delicious new coffee',
      type: 'Robusta',
      price: 4.5,
      image_url: 'http://example.com/new-coffee.jpg',
    };

    it('should create coffee when name is unique', async () => {
      mockCoffeeDomainService.validateUniqueNameForCreation.mockResolvedValue(
        undefined,
      );
      mockCoffeeRepository.create.mockResolvedValue(mockCoffee);

      const expectedCreateModel: CoffeeCreateModel = {
        name: 'New Coffee',
        description: 'A delicious new coffee',
        type: 'Robusta',
        price: 4.5,
        image_url: 'http://example.com/new-coffee.jpg',
      };

      const result = await createCoffeeUseCase.execute(createCoffeeDto);

      expect(
        mockCoffeeDomainService.validateUniqueNameForCreation,
      ).toHaveBeenCalledWith('New Coffee');
      expect(mockCoffeeRepository.create).toHaveBeenCalledWith(
        expectedCreateModel,
      );
      expect(result).toBe(mockCoffee);
    });

    it('should throw error when coffee name already exists', async () => {
      const error = new DomainError('Coffee with name already exists');
      mockCoffeeDomainService.validateUniqueNameForCreation.mockRejectedValue(
        error,
      );

      await expect(
        createCoffeeUseCase.execute(createCoffeeDto),
      ).rejects.toThrow();
      expect(
        mockCoffeeDomainService.validateUniqueNameForCreation,
      ).toHaveBeenCalledWith('New Coffee');
      expect(mockCoffeeRepository.create).not.toHaveBeenCalled();
    });

    it('should handle repository errors gracefully', async () => {
      mockCoffeeDomainService.validateUniqueNameForCreation.mockResolvedValue(
        undefined,
      );
      mockCoffeeRepository.create.mockRejectedValue(
        new Error('Database error'),
      );

      await expect(
        createCoffeeUseCase.execute(createCoffeeDto),
      ).rejects.toThrow('Database error');
      expect(
        mockCoffeeDomainService.validateUniqueNameForCreation,
      ).toHaveBeenCalledWith('New Coffee');
      expect(mockCoffeeRepository.create).toHaveBeenCalled();
    });

    it('should pass all properties correctly to repository', async () => {
      mockCoffeeDomainService.validateUniqueNameForCreation.mockResolvedValue(
        undefined,
      );
      mockCoffeeRepository.create.mockResolvedValue(mockCoffee);

      const detailedDto: CreateCoffeeDto = {
        name: 'Premium Coffee',
        description: 'Premium arabica beans with chocolate notes',
        type: 'Robusta',
        price: 12.99,
        image_url: 'http://example.com/premium.jpg',
      };

      await createCoffeeUseCase.execute(detailedDto);

      expect(
        mockCoffeeDomainService.validateUniqueNameForCreation,
      ).toHaveBeenCalledWith('Premium Coffee');
      expect(mockCoffeeRepository.create).toHaveBeenCalledWith({
        name: 'Premium Coffee',
        description: 'Premium arabica beans with chocolate notes',
        type: 'Robusta',
        price: 12.99,
        image_url: 'http://example.com/premium.jpg',
      });
    });
  });
});

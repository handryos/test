import { RegisterUseCase } from '../../../../../src/application/use-cases/auth/register/register.use-case';
import { UserRepository } from '../../../../../src/domain/interfaces/repositories/user/user.repository.interface';
import { RegisterDto } from '../../../../../src/@shared/@dtos/auth.dto';
import { UserEntity } from '../../../../../src/domain/entities/user/user.entity';
import { UserCreateModel } from '../../../../../src/domain/models/user/user.model';
import * as bcrypt from 'bcryptjs';

jest.mock('bcryptjs');

describe('RegisterUseCase', () => {
  let registerUseCase: RegisterUseCase;
  let mockUserRepository: jest.Mocked<UserRepository>;

  const mockUser: UserEntity = {
    id: 1,
    name: 'newuser',
    password: 'hashedPassword',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockUserRepository = {
      findByName: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    };

    registerUseCase = new RegisterUseCase(mockUserRepository);

    jest.clearAllMocks();
  });

  describe('execute', () => {
    const registerDto: RegisterDto = {
      name: 'newuser',
      password: 'password123',
    };

    it('should create user when name is unique', async () => {
      mockUserRepository.findByName.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue(mockUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

      const expectedCreateModel: UserCreateModel = {
        name: 'newuser',
        password: 'hashedPassword',
      };

      const result = await registerUseCase.execute(registerDto);

      expect(mockUserRepository.findByName).toHaveBeenCalledWith('newuser');
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(mockUserRepository.create).toHaveBeenCalledWith(
        expectedCreateModel,
      );
      expect(result).toBe(mockUser);
    });

    it('should throw error when user name already exists', async () => {
      const existingUser: UserEntity = {
        id: 2,
        name: 'existinguser',
        password: 'hashedPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockUserRepository.findByName.mockResolvedValue(existingUser);

      await expect(registerUseCase.execute(registerDto)).rejects.toThrow();
      expect(mockUserRepository.findByName).toHaveBeenCalledWith('newuser');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });

    it('should hash password with salt rounds of 10', async () => {
      mockUserRepository.findByName.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue(mockUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

      await registerUseCase.execute(registerDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    });

    it('should handle repository errors gracefully', async () => {
      mockUserRepository.findByName.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      mockUserRepository.create.mockRejectedValue(new Error('Database error'));

      await expect(registerUseCase.execute(registerDto)).rejects.toThrow(
        'Database error',
      );
      expect(mockUserRepository.findByName).toHaveBeenCalledWith('newuser');
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(mockUserRepository.create).toHaveBeenCalled();
    });
  });
});

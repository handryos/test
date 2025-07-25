import { LoginUseCase } from '../../../../../src/application/use-cases/auth/login/login.use-case';
import { UserRepository } from '../../../../../src/domain/interfaces/repositories/user/user.repository.interface';
import { LoginDto } from '../../../../../src/@shared/@dtos/auth.dto';
import { UserEntity } from '../../../../../src/domain/entities/user/user.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let mockUserRepository: jest.Mocked<UserRepository>;

  const mockUser: UserEntity = {
    id: 1,
    name: 'testuser',
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

    loginUseCase = new LoginUseCase(mockUserRepository);

    jest.clearAllMocks();
  });

  describe('execute', () => {
    const loginDto: LoginDto = {
      name: 'testuser',
      password: 'password123',
    };

    it('should return auth response when credentials are valid', async () => {
      mockUserRepository.findByName.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('fake-jwt-token');

      const result = await loginUseCase.execute(loginDto);

      expect(mockUserRepository.findByName).toHaveBeenCalledWith('testuser');
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password123',
        'hashedPassword',
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { sub: 1, name: 'testuser' },
        'test-secret',
        { expiresIn: '24h' },
      );
      expect(result).toEqual({
        access_token: 'fake-jwt-token',
        user: {
          id: 1,
          name: 'testuser',
        },
      });
    });

    it('should throw error when user does not exist', async () => {
      mockUserRepository.findByName.mockResolvedValue(null);

      await expect(loginUseCase.execute(loginDto)).rejects.toThrow();
      expect(mockUserRepository.findByName).toHaveBeenCalledWith('testuser');
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    it('should throw error when password is invalid', async () => {
      mockUserRepository.findByName.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(loginUseCase.execute(loginDto)).rejects.toThrow();
      expect(mockUserRepository.findByName).toHaveBeenCalledWith('testuser');
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password123',
        'hashedPassword',
      );
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it('should use JWT_SECRET from environment when available', async () => {
      const originalEnv = process.env.JWT_SECRET;
      process.env.JWT_SECRET = 'custom-secret';

      mockUserRepository.findByName.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('fake-jwt-token');

      await loginUseCase.execute(loginDto);

      expect(jwt.sign).toHaveBeenCalledWith(
        { sub: 1, name: 'testuser' },
        'custom-secret',
        { expiresIn: '24h' },
      );

      process.env.JWT_SECRET = originalEnv;
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../../../../src/infra/http/controllers/auth/auth.controller';
import { RegisterUseCase } from '../../../../../src/application/use-cases/auth/register/register.use-case';
import { LoginUseCase } from '../../../../../src/application/use-cases/auth/login/login.use-case';
import {
  REGISTER_USE_CASE,
  LOGIN_USE_CASE,
} from '../../../../../src/modules/auth/auth-use-case.tokens';
import {
  RegisterDto,
  LoginDto,
} from '../../../../../src/@shared/@dtos/auth.dto';
import { UserEntity } from '../../../../../src/domain/entities/user/user.entity';
import { DomainError } from '../../../../../src/domain/models/@shared/domain-error';

describe('AuthController', () => {
  let controller: AuthController;
  let mockRegisterUseCase: jest.Mocked<RegisterUseCase>;
  let mockLoginUseCase: jest.Mocked<LoginUseCase>;

  const mockUser: UserEntity = {
    id: 1,
    name: 'testuser',
    password: 'hashedPassword',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  };

  beforeEach(async () => {
    mockRegisterUseCase = {
      execute: jest.fn(),
    } as any;

    mockLoginUseCase = {
      execute: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: REGISTER_USE_CASE,
          useValue: mockRegisterUseCase,
        },
        {
          provide: LOGIN_USE_CASE,
          useValue: mockLoginUseCase,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    const registerDto: RegisterDto = {
      name: 'newuser',
      password: 'password123',
    };

    it('should register a new user successfully', async () => {
      mockRegisterUseCase.execute.mockResolvedValue(mockUser);

      const result = await controller.register(registerDto);

      expect(mockRegisterUseCase.execute).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual({
        id: 1,
        name: 'testuser',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      });
    });

    it('should handle user creation with undefined dates', async () => {
      const userWithoutDates: UserEntity = {
        id: 1,
        name: 'testuser',
        password: 'hashedPassword',
      };
      mockRegisterUseCase.execute.mockResolvedValue(userWithoutDates);

      const result = await controller.register(registerDto);

      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
      expect(result.id).toBe(1);
      expect(result.name).toBe('testuser');
    });

    it('should propagate errors from use case', async () => {
      const error = new DomainError('User already exists');
      mockRegisterUseCase.execute.mockRejectedValue(error);

      await expect(controller.register(registerDto)).rejects.toThrow(
        'User already exists',
      );
      expect(mockRegisterUseCase.execute).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('login', () => {
    const loginDto: LoginDto = {
      name: 'testuser',
      password: 'password123',
    };

    const expectedAuthResponse = {
      access_token: 'jwt-token',
      user: {
        id: 1,
        name: 'testuser',
      },
    };

    it('should login user successfully', async () => {
      mockLoginUseCase.execute.mockResolvedValue(expectedAuthResponse);

      const result = await controller.login(loginDto);

      expect(mockLoginUseCase.execute).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual(expectedAuthResponse);
    });

    it('should propagate errors from use case', async () => {
      const error = new DomainError('Invalid credentials');
      mockLoginUseCase.execute.mockRejectedValue(error);

      await expect(controller.login(loginDto)).rejects.toThrow(
        'Invalid credentials',
      );
      expect(mockLoginUseCase.execute).toHaveBeenCalledWith(loginDto);
    });
  });
});

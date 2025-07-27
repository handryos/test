import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import {
  RegisterDto,
  LoginDto,
  AuthResponseDto,
  UserResponseDto,
} from '../../../../@shared/@dtos/auth.dto';
import { RegisterUseCase } from '../../../../application/use-cases/auth/register/register.use-case';
import { LoginUseCase } from '../../../../application/use-cases/auth/login/login.use-case';
import { DomainError } from '../../../../domain/models/@shared/domain-error';
import { Public } from '../../../../@shared/decorators/public.decorator';
import {
  REGISTER_USE_CASE,
  LOGIN_USE_CASE,
} from '../../../../modules/auth/auth-use-case.tokens';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(REGISTER_USE_CASE)
    private readonly registerUseCase: RegisterUseCase,
    @Inject(LOGIN_USE_CASE)
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Public()
  @Post('register')
  @ApiOperation({
    summary: 'Register new user',
    description: 'Create a new user account with name and password',
  })
  @ApiBody({
    type: RegisterDto,
    description: 'User registration data',
    examples: {
      example1: {
        summary: 'User Registration',
        value: {
          name: 'User',
          password: 'securePassword123',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: UserResponseDto,
    example: {
      id: 1,
      name: 'User',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Invalid input data or name already exists',
    example: {
      message: 'Name already exists',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    example: {
      message: 'Internal server error',
      statusCode: 500,
    },
  })
  async register(@Body() registerDto: RegisterDto): Promise<UserResponseDto> {
    try {
      const user = await this.registerUseCase.execute(registerDto);
      return {
        id: user.id,
        name: user.name,
        createdAt: user.createdAt || new Date(),
        updatedAt: user.updatedAt || new Date(),
      };
    } catch (error) {
      if (error instanceof DomainError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Public()
  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate user and return JWT token',
  })
  @ApiBody({
    type: LoginDto,
    description: 'User login credentials',
    examples: {
      example1: {
        summary: 'User Login',
        value: {
          name: 'User',
          password: 'securePassword123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: AuthResponseDto,
    example: {
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      user: {
        id: 1,
        name: 'User',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid credentials',
    example: {
      message: 'Unauthorized - Invalid credentials',
      statusCode: 401,
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    example: {
      message: 'Internal server error',
      statusCode: 500,
    },
  })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    try {
      return await this.loginUseCase.execute(loginDto);
    } catch (error) {
      if (error instanceof DomainError) {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

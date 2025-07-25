import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
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

import { UserRepository } from '../../../../domain/interfaces/repositories/user/user.repository.interface';
import { LoginDto, AuthResponseDto } from '../../../../@shared/@dtos/auth.dto';
import { DomainError } from '../../../../domain/models/@shared/domain-error';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export class LoginUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(loginData: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByName(loginData.name);
    if (!user) {
      throw new DomainError('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new DomainError('Invalid credentials');
    }

    const payload = { sub: user.id, name: user.name };
    const secret = process.env.JWT_SECRET || 'default-secret';
    const access_token = jwt.sign(payload, secret, { expiresIn: '24h' });

    return {
      access_token,
      user: {
        id: user.id,
        name: user.name,
      },
    };
  }
}

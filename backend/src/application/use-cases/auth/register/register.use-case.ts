import { UserEntity } from '../../../../domain/entities/user/user.entity';
import { UserCreateModel } from '../../../../domain/models/user/user.model';
import { UserRepository } from '../../../../domain/interfaces/repositories/user/user.repository.interface';
import { RegisterDto } from '../../../../@shared/@dtos/auth.dto';
import { DomainError } from '../../../../domain/models/@shared/domain-error';
import * as bcrypt from 'bcryptjs';

export class RegisterUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(registerData: RegisterDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findByName(
      registerData.name,
    );
    if (existingUser) {
      throw new DomainError(
        `User with name '${registerData.name}' already exists`,
      );
    }

    const hashedPassword = await bcrypt.hash(registerData.password, 10);

    const createModel: UserCreateModel = {
      name: registerData.name,
      password: hashedPassword,
    };

    return await this.userRepository.create(createModel);
  }
}

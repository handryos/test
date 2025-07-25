import { UserEntity } from '../../../domain/entities/user/user.entity';
import { UserRepository } from '../../../domain/interfaces/repositories/user/user.repository.interface';
import { UserUpdateModel } from '../../../domain/models/user/user.model';
import { BaseSequelizeRepository } from './base.repository';
import { UserModel } from './user.model';

export class SequelizeUserRepository
  extends BaseSequelizeRepository<UserEntity, UserUpdateModel, UserModel>
  implements UserRepository
{
  constructor() {
    super(UserModel);
  }

  async findByName(name: string): Promise<UserEntity | null> {
    const user = await this.model.findOne({ where: { name } });
    return user ? this.toDomain(user) : null;
  }

  protected toDomain(model: UserModel): UserEntity {
    return {
      id: model.id,
      name: model.name,
      password: model.password,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }
}

import { UserEntity } from 'src/domain/entities/user';
import { IBaseRepository } from '../base-repository-interface';
import { UserCreateModel, UserUpdateModel } from 'src/domain/models/user';

export interface UserRepository
  extends IBaseRepository<UserEntity, UserCreateModel, UserUpdateModel> {
  findByName(name: string): Promise<UserEntity | null>;
}

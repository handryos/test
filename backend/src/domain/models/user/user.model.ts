import { UserEntity } from '../../entities/user/user.entity';

export interface UserModel extends UserEntity {}

export interface UserCreateModel {
  name: string;
  password: string;
}

export interface UserUpdateModel {
  name?: string;
  password?: string;
}

export interface UserLoginModel {
  name: string;
  password: string;
}

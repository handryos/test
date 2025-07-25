import { IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class RegisterDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(6, 100)
  password: string;
}

export class LoginDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(6, 100)
  password: string;
}

export class AuthResponseDto {
  access_token: string;

  user: {
    id: number;
    name: string;
  };
}

export class UserResponseDto {
  id: number;
  name: string;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt: Date;
}

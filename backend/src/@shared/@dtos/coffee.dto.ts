import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUrl,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image_url: string;
}

export class UpdateCoffeeDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  type?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image_url?: string;
}

export class CoffeeResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  type: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsUrl()
  image_url: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

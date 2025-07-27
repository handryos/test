import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUrl,
  IsOptional,
  IsDate,
  IsIn,
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
  @IsIn(['Arabic', 'Robusta'], { message: 'Type must be either "Arabic" or "Robusta"' })
  type: 'Arabic' | 'Robusta';

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
  @IsIn(['Arabic', 'Robusta'], { message: 'Type must be either "Arabic" or "Robusta"' })
  type?: 'Arabic' | 'Robusta';

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
  type: 'Arabic' | 'Robusta';

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

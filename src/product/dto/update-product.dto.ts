import { IsString, IsOptional, IsNumber, IsPositive, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  quantity?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  expiryDate?: Date;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  categoryId?: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsPositive, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Organic Apple',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'A brief description of the product',
    example: 'Fresh organic apple from local farms.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 1.99,
    required: false,
  })
  @IsOptional()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value)) // Ensure price is a number
  price?: number;

  @ApiProperty({
    description: 'The available quantity of the product',
    example: 100,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10)) // Ensure quantity is an integer
  quantity?: number;

  @ApiProperty({ description: 'The URL of the product image', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    description: 'The expiry date of the product (if applicable)',
    example: '2024-12-31',
    required: false,
  })
  @IsOptional()
  @IsString()
  expiryDate?: string;

  @ApiProperty({
    description: 'The category name this product belongs to',
    example: 'Fruits',
    required: false,
  })
  @IsOptional()
  @IsString()
  categoryName?: string;
}

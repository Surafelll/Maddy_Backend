import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsOptional,
  IsDateString,
  IsPositive,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Organic Apple',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'A brief description of the product',
    example: 'Fresh organic apple from local farms.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 1.99,
  })
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'The available quantity of the product',
    example: 100,
  })
  @IsInt()
  @Min(0)
  quantity: number;

  @ApiProperty({
    description: 'The URL of the product image',
    example: 'https://example.com/images/organic-apple.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    description: 'The expiry date of the product (if applicable)',
    example: '2024-12-31',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  expiryDate?: Date;

  @ApiProperty({
    description: 'The ID of the category this product belongs to',
    example: 1,
  })
  @IsInt()
  categoryId: number;
}

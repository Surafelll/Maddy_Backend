import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({ description: 'The name of the category' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The description of the category', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'The type of the category' })
  @IsString()
  type: string;
}

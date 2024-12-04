import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'testuser',
    description: 'The username of the account',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'testpassword',
    description: 'The password of the account',
  })
  @IsString()
  password: string;
}

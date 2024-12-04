import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger'; // Import Swagger decorators

@ApiTags('auth') // Group the login endpoint under 'auth'
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login with username and password' }) // Operation description in Swagger
  @ApiBody({ type: LoginDto }) // Request body type
  async login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;

    // Validate user credentials
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      // If the user is not found or credentials are incorrect, throw an HTTP exception
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    // Generate and return the JWT token
    return this.authService.login(user);
  }
}

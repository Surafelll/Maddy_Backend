import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // For environment variables
import { PrismaModule } from '../prisma/prisma.module'; // Ensure correct path
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables globally
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule for async configuration
      inject: [ConfigService], // Inject ConfigService to access environment variables
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Retrieve JWT secret from environment variables
        signOptions: { expiresIn: '60m' }, // Token expiration time
      }),
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy, // Strategy for validating JWTs
  ],
  controllers: [AuthController], // Controller to handle authentication routes
  exports: [AuthService, JwtModule], // Export AuthService and JwtModule for use in other modules
})
export class AuthModule {}

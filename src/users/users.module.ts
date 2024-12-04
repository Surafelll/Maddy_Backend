// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [UserService, PrismaService], // Add UserService to providers
  exports: [UserService], // Export UserService so other modules can use it
})
export class UserModule {}

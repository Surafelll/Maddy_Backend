// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Method to find a user by username (used for login)
  async findUserByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  // Method to create a user (for registration or seeding)
  async createUser(username: string, password: string) {
    return this.prisma.user.create({
      data: {
        username,
        password,
      },
    });
  }
}

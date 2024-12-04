import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }

  // Method to find a user by username (used for login)
  async findUserByUsername(username: string) {
    return this.user.findUnique({
      where: { username },
    });
  }

  // Optional: Method to create a user (for seeding or manual management)
  async createUser(username: string, password: string) {
    return this.user.create({
      data: {
        username,
        password, // Store hashed password in real implementation
      },
    });
  }
}

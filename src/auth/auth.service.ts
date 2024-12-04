import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Validate user credentials
  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  // Generate JWT for authenticated users
  async login(user: User) {
    const payload = { username: user.username, sub: String(user.id) };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Validate JWT payload and get the user
  async validateUserByPayload(payload: {
    username: string;
    sub: string;
  }): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username: payload.username },
    });
  }
}

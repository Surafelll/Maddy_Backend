import { Module } from '@nestjs/common';
import { SoldProductService } from './sold-product.service';
import { SoldProductController } from './sold-product.controller';
import { PrismaService } from '../prisma/prisma.service'; // Import PrismaService

@Module({
  controllers: [SoldProductController],
  providers: [SoldProductService, PrismaService], // Register services
})
export class SoldProductModule {}

import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Add PrismaModule to imports
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}

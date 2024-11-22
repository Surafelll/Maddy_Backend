import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module'; // Import ProductModule
import { CategoryModule } from './category/category.module';
import { ReportModule } from './report/report.module';
import { TransactionModule } from './transaction/transaction.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ProductModule,CategoryModule,ReportModule,TransactionModule], // Register ProductModule
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
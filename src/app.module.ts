import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path'; // For joining paths to ensure cross-platform compatibility
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { SoldProductModule } from './sold/sold-product.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load ConfigModule globally
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to your uploads folder
      serveRoot: '/uploads', // URL prefix for accessing the files
    }),
    ProductModule,
    CategoryModule,
    TransactionModule,
    SoldProductModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

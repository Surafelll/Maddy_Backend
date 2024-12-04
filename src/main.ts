import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend access
  app.enableCors({
    origin: 'http://localhost:5173', // Adjust to your frontend URL
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Set a global prefix for all API routes
  app.setGlobalPrefix('api');

  // Enable global validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
    }),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('My API') // Set your API title
    .setDescription('API documentation for all routes in the system') // Add a description
    .setVersion('1.0') // API version
    .addBearerAuth({
      // Configure Bearer token authentication in Swagger
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();

  // Create Swagger document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Swagger endpoint at '/api/docs'

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000/api/docs');
}

bootstrap();

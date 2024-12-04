import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common'; // Global validation pipe
import { join } from 'path';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  // Create the NestJS application instance
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(express()), // Using Express adapter for static file serving
  );

  // Enable Cross-Origin Resource Sharing (CORS)
  app.enableCors({
    origin: 'http://localhost:5173', // Frontend URL for dev
    methods: 'GET,POST,PUT,DELETE',
  });

  // Set a global prefix for all API routes (e.g., /api/products)
  app.setGlobalPrefix('api');

  // Enable global validation for all incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform payloads to DTO instances
      whitelist: true, // Strip properties that are not defined in the DTO
      forbidNonWhitelisted: true, // Reject requests that have extra properties
      skipMissingProperties: false, // Ensure that missing properties are rejected
    }),
  );

  // Serve static files (uploaded images, etc.)
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  // Swagger setup for API documentation
  const config = new DocumentBuilder()
    .setTitle('My API') // Title of the API
    .setDescription('API documentation for all routes in the system') // Description
    .setVersion('1.0') // Version of the API
    .build();

  // Create the Swagger document
  const document = SwaggerModule.createDocument(app, config);
  
  // Setup Swagger UI to be available at /api/docs
  SwaggerModule.setup('api/docs', app, document);

  // Start the application on port 3000
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}

// Bootstrapping the NestJS application
bootstrap();

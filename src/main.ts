import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // Allow frontend origin
    methods: 'GET,POST,PUT,DELETE', // Specify allowed methods
  });
  // Set the global prefix for all routes
  app.setGlobalPrefix('api');

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transforms payload to DTO instance
      whitelist: true, // Automatically strips properties that are not in the DTO
      forbidNonWhitelisted: true, // Throws an error if non-whitelisted properties are passed
      skipMissingProperties: false, // Ensures that missing properties are flagged as errors
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation for all routes in the system')
    .setVersion('1.0')

    .build();

  // Create Swagger document
  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger UI at /api/docs
  SwaggerModule.setup('api/docs', app, document);

  // Start the application
  await app.listen(3000);

  // Log the running application URL
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend access
  app.enableCors({
    origin: true, // Dynamically allow any origin
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
    .setTitle('My API')
    .setDescription('API documentation for all routes in the system')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Use dynamic port for Render
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}/api/docs`);
}

bootstrap();


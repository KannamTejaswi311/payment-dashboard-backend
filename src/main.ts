import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS for frontend to talk to backend
  app.enableCors({
    origin: '*', // Replace * with your frontend URL in production for better security
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Optional but recommended: validate incoming requests
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();

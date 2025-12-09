import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://infinite-scroll-tanstack-query.vercel.app',
    ],
    credentials: true, // 쿠키를 주고받기 위해 필요
  });

  // 쿠키 파서 미들웨어 추가
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 8000);
  console.log(
    `Application is running on: http://localhost:${process.env.PORT ?? 8000}`,
  );
}
bootstrap();

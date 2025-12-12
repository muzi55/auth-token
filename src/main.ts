import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 쿠키 파서 미들웨어 등록
  app.use(cookieParser());

  // CORS 설정 - 프론트엔드(localhost:3000)와 통신을 위한 설정
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true, // 쿠키를 주고받기 위해 필요
  });

  // 전역 유효성 검사 파이프 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 없는 속성 제거
      forbidNonWhitelisted: true, // DTO에 없는 속성이 있으면 에러 발생
      transform: true, // 요청 데이터를 DTO 타입으로 자동 변환
    }),
  );

  // Render에서 제공하는 PORT 환경변수 사용
  const port = process.env.PORT || 8000;
  await app.listen(port, '0.0.0.0'); // 모든 네트워크 인터페이스에서 수신

  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();

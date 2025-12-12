// 2025년 12월 12일
// app.service.ts - 애플리케이션 메인 서비스

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // 헬스체크 API
  getHealthCheck() {
    return {
      status: 'ok',
      message: 'Auth Token API is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };
  }
}

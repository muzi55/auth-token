// 2025년 12월 12일
// app.controller.ts - 애플리케이션 메인 컨트롤러

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 헬스체크 엔드포인트
  @Get('health')
  getHealthCheck() {
    return this.appService.getHealthCheck();
  }
}

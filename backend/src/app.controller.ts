import { Controller, Get } from '@nestjs/common';
import { Public } from './common/decorators/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get('api/health')
  healthCheck() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'esports-platform-backend',
    };
  }

  @Public()
  @Get()
  getRoot() {
    return {
      message: 'eSports Platform API',
      version: '1.0.0',
      documentation: '/api',
    };
  }
}

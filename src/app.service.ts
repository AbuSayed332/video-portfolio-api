import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    return 'Video Editor Portfolio API is running! 🎬✨';
  }

  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: this.configService.get('NODE_ENV'),
      version: '1.0.0',
      endpoints: {
        portfolio: '/api/v1/portfolio',
        testimonials: '/api/v1/testimonials',
        skills: '/api/v1/skills',
        profile: '/api/v1/profile',
        contact: '/api/v1/contact',
      },
    };
  }
}
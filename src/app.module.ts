import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { TestimonialsModule } from './modules/testimonials/testimonials.module';
import { SkillsModule } from './modules/skills/skills.module';
import { ContactModule } from './modules/contact/contact.module';
import { ProfileModule } from './modules/profile/profile.module';
<<<<<<< HEAD
import { AuthModule } from './modules/auth/auth.module';
=======
>>>>>>> 13c3acdb88aed68b530b0b40f5855c1243fecd80

import { databaseConfig } from './config/database.config';
import { validationSchema } from './config/validation.schema';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      envFilePath: '.env',
    }),

    // Rate limiting
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: 60000, // 1 minute
          limit: configService.get('NODE_ENV') === 'production' ? 20 : 100,
        },
      ],
    }),

    // MongoDB Database
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => databaseConfig(configService),
    }),

    // Feature modules
<<<<<<< HEAD
    AuthModule,
=======
>>>>>>> 13c3acdb88aed68b530b0b40f5855c1243fecd80
    PortfolioModule,
    TestimonialsModule,
    SkillsModule,
    ContactModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
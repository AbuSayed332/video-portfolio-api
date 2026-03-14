import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { PortfolioItem, PortfolioSchema } from './schemas/portfolio.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PortfolioItem.name, schema: PortfolioSchema },
    ]),
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService],
  exports: [PortfolioService],
})
export class PortfolioModule {}
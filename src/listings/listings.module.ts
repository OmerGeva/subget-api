import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingsController } from './listings.controller';
import { ListingsRepository } from './listings.repository';
import { ListingsService } from './listings.service';

@Module({
  imports: [TypeOrmModule.forFeature([ListingsRepository])],
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class ListingsModule {}

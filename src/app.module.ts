import { Module } from '@nestjs/common';
import { ListingsModule } from './listings/listings.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ListingsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'omergeva',
      password: 'postgres',
      database: 'listing-db',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';

@Module({
  imports: [
    MulterModule.register(),
    TypeOrmModule.forFeature([Item]),
  ],
  providers: [ItemService],
  controllers: [ItemController]
})
export class ItemModule {}

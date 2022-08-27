import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entity/item.entity';
import { Type } from './entity/item_type.entity';
import { Brand } from './entity/item_brand.entity';

@Module({
  imports: [
    MulterModule.register(),
    TypeOrmModule.forFeature([Item, Type, Brand]),
  ],
  providers: [ItemService],
  controllers: [ItemController]
})
export class ItemModule {}

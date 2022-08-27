import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { typeORMconfig } from './config/typeORM.config';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMconfig),
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ItemModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

  ],
})
export class AppModule {}

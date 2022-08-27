import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import * as config from 'config';
import { Item } from "src/item/entity/item.entity";
import { Type } from "src/item/entity/item_type.entity";
import { Brand } from "src/item/entity/item_brand.entity";

const dbConfig = config.get('db');

export const typeORMconfig: TypeOrmModuleOptions = {

	type: dbConfig.type,
	host: dbConfig.host,
	port: dbConfig.port,
	username: dbConfig.user,
	password: dbConfig.password,
	database: dbConfig.database,
	entities: [__dirname + '/**/entity/*.entity{.ts,.js}', User, Item, Type, Brand],
	synchronize: true
}


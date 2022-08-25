import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import * as config from 'config';

const dbConfig = config.get('db');

export const typeORMconfig: TypeOrmModuleOptions = {

	type: dbConfig.type,
	host: dbConfig.host,
	port: dbConfig.port,
	username: dbConfig.user,
	password: dbConfig.password,
	database: dbConfig.database,
	entities: [__dirname + '/**/entity/*.entity{.ts,.js}', User],
	synchronize: true
}


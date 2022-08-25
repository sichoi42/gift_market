import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";

export const typeORMconfig: TypeOrmModuleOptions = {

	type: 'mysql',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT),
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_SCHE,
	entities: [__dirname + '/../**/*.entity.{js,ts}', User],
	synchronize: true
}


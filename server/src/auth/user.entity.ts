import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username', 'nickname', 'email'])
export class User extends BaseEntity {
	@ApiProperty({
		example: '1',
		description: 'id',
		required: true,
	})
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty({
		example: 'swchoi2000',
		description: 'username',
		required: true,
	})
	@Column()
	username: string;

	@ApiProperty({
		example: 'sichoi',
		description: 'nickname',
		required: true,
	})
	@Column()
	nickname: string;

	@ApiProperty({
		example: 'swchoi2000@dgu.ac.kr',
		description: 'email',
		required: true,
	})
	@Column()
	email: string;

	@ApiProperty({
		example: '12345678',
		description: 'password',
		required: true,
	})
	@Column()
	password: string;
}

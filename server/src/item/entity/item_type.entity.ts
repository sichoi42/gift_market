import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Type extends BaseEntity {
	@ApiProperty({
		example: 1,
		required: true,
	})
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty({
		example: '카페',
		required: true,
	})
	@Column()
	type_name: string;

	@ApiProperty({
		example: 'public/categories/카페.jpeg',
		required: true,
	})
	@Column()
	type_img_url: string;
}

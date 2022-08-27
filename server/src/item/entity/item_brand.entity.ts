import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Brand extends BaseEntity {
	@ApiProperty({
		example: 1,
		required: true,
	})
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty({
		example: '스타벅스',
		required: true,
	})
	@Column()
	brand_name: string;

	@ApiProperty({
		example: 1,
		required: true,
	})
	@Column()
	type_id: number;

	@ApiProperty({
		example: '카페',
		required: true,
	})
	@Column()
	type_name: string;

	@ApiProperty({
		example: 'public/brands/스타벅스.jpeg',
		required: true,
	})
	@Column()
	brand_img_url: string;
}

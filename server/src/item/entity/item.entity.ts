import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['img_url', 'pin_number'])
export class Item extends BaseEntity {
	@ApiProperty({
		example: 1,
		required: true,
	})
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty({
		example: '스타벅스 아이스 아메리카노 Tall',
		required: true,
	})
	@Column()
	item_name: string;

	@ApiProperty({
		example: '1234-5678-9012',
		required: true,
	})
	@Column()
	pin_number: string;

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
		example: 1,
		required: true,
	})
	@Column()
	brand_id: number;

	@ApiProperty({
		example: '스타벅스',
		required: true,
	})
	@Column()
	brand_name: string;

	@ApiProperty({
		example: 4500,
		required: true,
	})
	@Column()
	price: number;

	@ApiProperty({
		example: new Date('2022-09-27'),
		required: true,
	})
	@Column({
		type: 'timestamp',
		nullable: false,
	})
	expire_date: Date;

	@ApiProperty({
		example: new Date('2022-08-27'),
		required: true,
	})
	@Column({ type: 'timestamp' })
	register_date: Date;

	@ApiProperty({
		example: false,
		required: true,
	})
	@Column()
	is_saled: boolean;

	@ApiProperty({
		example: undefined,
		required: true,
	})
	@Column({ nullable: true })
	buyer_id: number;

	@ApiProperty({
		example: 'sichoi',
		required: true,
	})
	@Column()
	seller_id: number | null;

	@ApiProperty({
		example: 'public/categories/카페.jpeg',
		required: true,
	})
	@Column()
	img_url: string;
}

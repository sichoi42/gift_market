import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['img_url'])
export class Item extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	item_name: string;

	@Column()
	pin_number: string;

	@Column()
	type_id: number;

	@Column()
	type_name: string;

	@Column()
	brand_id: number;

	@Column()
	brand_name: string;

	@Column()
	price: number;

	@Column()
	expire_date: Date;

	@Column()
	register_date: Date;

	@Column()
	is_saled: boolean;

	@Column()
	buyer_id: number | undefined;

	@Column()
	seller_id: number;

	@Column()
	img_url: string;
}

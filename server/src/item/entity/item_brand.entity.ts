import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Brand extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	brand_name: string;

	@Column()
	type_id: number;

	@Column()
	type_name: string;

	@Column()
	brand_img_url: string;
}

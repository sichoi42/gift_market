import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Type extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	type_name: string;

	@Column()
	type_img_url: string;
}

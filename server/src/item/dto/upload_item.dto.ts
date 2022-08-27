import { IsDate, IsNumber, IsString } from "class-validator";

export class UpLoadItemDto {
	@IsString()
	item_name: string;

	@IsString()
	brand_name: string;

	@IsNumber()
	price: number;

	@IsDate()
	expire_date: Date;

	@IsNumber()
	pin_number: string;
}

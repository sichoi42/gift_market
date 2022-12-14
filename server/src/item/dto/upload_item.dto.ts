import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDate, IsDateString, IsNumber, IsString } from "class-validator";

export class UpLoadItemDto {
	// @ApiProperty({
	// 	example: '스타벅스 아이스 아메리카노 Tall',
	// 	required: true,
	// })
	@IsString()
	item_name: string;

	// @ApiProperty({
	// 	example: '스타벅스',
	// 	required: true,
	// })
	@IsString()
	brand_name: string;

	// @ApiProperty({
	// 	example: 4500,
	// 	required: true,
	// })
	@IsNumber()
	@Transform(({ value }) => Number.parseInt(value))
	price: number;

	// @ApiProperty({
	// 	example: new Date('2022-09-27'),
	// 	required: true,
	// })
	@IsDate()
	@Type(() => Date)
	expire_date: Date;

	// @ApiProperty({
	// 	example: '1234-5678-9012',
	// 	required: true,
	// })
	@IsString()
	pin_number: string;

}

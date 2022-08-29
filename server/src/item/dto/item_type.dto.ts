import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ItemTypeDto {
	// @ApiProperty({
	// 	example: '카페',
	// 	required: true,
	// })
	@IsString()
	type_name: string;

	// @ApiProperty({ type: 'string', format: 'binary', required: true })
	// type_img: Express.Multer.File
	// @IsString()
	type_img_url: string;
}

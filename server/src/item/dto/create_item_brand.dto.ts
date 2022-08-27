import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateItemBrandDto {
	@ApiProperty({
		example: '스타벅스',
		required: true,
	})
	@IsString()
	brand_name: string;

	@ApiProperty({
		example: '카페',
		required: true,
	})
	@IsString()
	type_name: string;

	// @IsString()
	// brand_img_url: string;
}

import { IsString } from "class-validator";

export class CreateItemBrandDto {
	@IsString()
	brand_name: string;

	@IsString()
	type_name: string;

	// @IsString()
	// brand_img_url: string;
}

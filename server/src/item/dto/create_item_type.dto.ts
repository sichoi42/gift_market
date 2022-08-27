import { IsString } from "class-validator";

export class CreateItemTypeDto {
	@IsString()
	type_name: string;

	@IsString()
	type_img_url: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginDTO {
	@ApiProperty({
		example: 'swchoi2000',
		required: true,
	})
	@IsString()
	@MinLength(4)
	@MaxLength(21)
	username: string;

	@ApiProperty({
		example: '12345678',
		required: true,
	})
	@IsString()
	@MinLength(8)
	@MaxLength(21)
	@Matches(/^[a-zA-Z0-9]*$/, {
		message: 'password only accepts English and number',
	})
	password: string;
}

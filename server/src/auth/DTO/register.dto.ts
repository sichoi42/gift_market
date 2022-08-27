import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
	@ApiProperty({
		example: 'swchoi2000',
		required: true,
	})
	@IsString()
	@MinLength(4)
	@MaxLength(21)
	username: string;

	@ApiProperty({
		example: 'sichoi',
		required: true,
	})
	@IsString()
	@MinLength(4)
	@MaxLength(21)
	nickname: string;

	@ApiProperty({
		example: 'swchoi2000@dgu.ac.kr',
		required: true,
	})
	@IsEmail()
	email: string;

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

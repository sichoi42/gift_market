import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthDTO {
	@IsString()
	@MinLength(4)
	@MaxLength(21)
	username: string;

	@IsString()
	@MinLength(4)
	@MaxLength(21)
	nickname: string;

	@IsEmail()
	email: string;

	@IsString()
	@MinLength(8)
	@MaxLength(21)
	@Matches(/^[a-zA-Z0-9]*$/, {
		message: 'password only accepts English and number',
	})
	password: string;
}

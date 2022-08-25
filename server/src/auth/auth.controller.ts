import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './DTO/auth.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/register')
	async register(@Body(ValidationPipe) authDTO: AuthDTO): Promise<User> {
		return await this.authService.register(authDTO);
	}

	@Post('/login')
	async login(@Body(ValidationPipe) authDTO: AuthDTO): Promise<{ token: string }> {
		return await this.authService.login(authDTO);
	}
}

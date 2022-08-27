import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/register')
	@ApiOperation({
		summary: '[사용자 API] 회원가입',
		description: '사용자가 폼을 입력하면 회원정보가 db에 저장된다.'
	})
	@ApiCreatedResponse({
		description: 'User Entity를 반환한다.',
		type: User
	})
	async register(@Body(ValidationPipe) registerDTO: RegisterDto): Promise<User> {
		return await this.authService.register(registerDTO);
	}

	@Post('/login')
	@ApiOperation({
		summary: '[사용자 API] 로그인 API',
		description: '사용자가 폼을 입력하여 로그인 요청을 받는다.'
	})
	@ApiCreatedResponse({
		description: 'User Entity를 반환한다.',
		type: User
	})
	async login(@Body(ValidationPipe) loginDTO: LoginDto): Promise<{ token: string }> {
		return await this.authService.login(loginDTO);
	}
}

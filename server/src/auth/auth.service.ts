import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private jwtService: JwtService
	) {}

	async register(registerDTO :RegisterDto): Promise<User> {
		const { username, nickname, email, password } = registerDTO;
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);
		const user = this.userRepository.create({
			username,
			nickname,
			email,
			password: hashedPassword,
		});
		try {
			await this.userRepository.save(user);
		} catch(err) {
			if (err.code === 'ER_DUP_ENTRY') {
				throw new ConflictException('Existing username or nickname or email');
			} else {
				throw new InternalServerErrorException();
			}
		}
		return user;
	}

	async login(loginDTO: LoginDto): Promise<{ token: string }> {
		const {username, password } = loginDTO;
		const user: User = await this.userRepository.findOne({
			where: {
				username: username
			}
		});
		if (user && (await bcrypt.compare(password, user.password))) {
			const payload = { username };
			const token = await this.jwtService.sign(payload);
			return { token };
		} else {
			throw new UnauthorizedException('Wrong username or password!!');
		}
	}
}

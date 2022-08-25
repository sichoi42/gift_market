import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthDTO } from './DTO/auth.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private jwtService: JwtService
	) {}

	async register(authDTO :AuthDTO): Promise<User> {
		const { username, nickname, email, password } = authDTO;
		const salt = await bcrypt.getSalt();
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
			if (err.code === '23505') {
				throw new ConflictException('Existing username or nickname or email');
			} else {
				throw new InternalServerErrorException();
			}
		}
		return user;
	}

	async login(authDTO: AuthDTO): Promise<{ token: string }> {
		const { username, password } = authDTO;
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

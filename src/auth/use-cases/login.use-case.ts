import { JwtService } from '@nestjs/jwt';
import { FindUserByEmailRepository } from './../repository/find-user-by-email.repository';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  async execute(data: LoginDto) {
    this.logger.log('Logging in user...');

    const user = await this.findUserByEmailRepository.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(data.password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const acessToken = this.jwtService.sign(payload);

    this.logger.log('User logged successfully!');

    return {
      acessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}

import * as UseCases from './use-cases';
import * as Repositories from './repository';
import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/shared/databases/prisma.database';

const useCases = Object.values(UseCases);
const repositories = Object.values(Repositories);

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    PrismaService,
    Logger,
    ...repositories,
    ...useCases,
  ],
})
export class AuthModule {}

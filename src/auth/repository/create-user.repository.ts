import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

type CreateUserParams = {
  name?: string;
  email: string;
  passwordHash: string;
};

@Injectable()
export class CreateUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserParams) {
    return await this.prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
}

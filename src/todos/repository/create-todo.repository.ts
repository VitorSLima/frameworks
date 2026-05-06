import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { CreateTodoDto } from '../dto/create-todo.dto';

@Injectable()
export class CreateTodoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTodoDto) {
    return await this.prisma.todo.create({ data });
  }
}

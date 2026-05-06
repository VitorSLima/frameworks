import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateTodoRepository } from '../repository';
import { CreateTodoDto } from '../dto/create-todo.dto';

@Injectable()
export class CreateTodoUseCase {
  constructor(
    private readonly createTodoRepository: CreateTodoRepository,
    private readonly logger: Logger,
  ) {}

  async execute(data: CreateTodoDto) {
    try {
      this.logger.log('Creating toDo...');
      const todo = await this.createTodoRepository.create(data);
      this.logger.log('ToDo created successfully');
      return todo;
    } catch (error: unknown) {
      this.logger.error(error);
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException(
          'Invalid userId: no user found with this id',
        );
      }

      throw new InternalServerErrorException('Failed to create toDo');
    }
  }
}

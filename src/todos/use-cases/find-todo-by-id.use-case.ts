import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindTodoByIdRepository } from '../repository';

@Injectable()
export class FindTodoByIdUseCase {
  constructor(
    private readonly findTodoByIdRepository: FindTodoByIdRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string) {
    try {
      this.logger.log('Finding toDo by id...');

      const todo = await this.findTodoByIdRepository.findById(id);

      if (!todo) {
        throw new NotFoundException('ToDo not found');
      }

      this.logger.log('ToDo found successfully');
      return todo;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

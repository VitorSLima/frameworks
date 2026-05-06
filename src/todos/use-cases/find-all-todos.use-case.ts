import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindAllTodosRepository } from '../repository';

@Injectable()
export class FindAllTodosUseCase {
  constructor(
    private readonly findAllTodosRepository: FindAllTodosRepository,
    private readonly logger: Logger,
  ) {}

  async execute() {
    try {
      this.logger.log('Finding all toDos...');
      const todos = await this.findAllTodosRepository.findAll();
      this.logger.log('ToDos found successfully');
      if (!todos) {
        throw new NotFoundException('No toDos found');
      }
      return todos;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to find all toDos');
    }
  }
}

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DeleteTodoRepository, FindTodoByIdRepository } from '../repository';

@Injectable()
export class DeleteTodoUseCase {
  constructor(
    private readonly deleteTodoRepository: DeleteTodoRepository,
    private readonly findTodoByIdRepository: FindTodoByIdRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string) {
    try {
      this.logger.log('Deleting toDo...');

      const todo = await this.findTodoByIdRepository.findById(id);

      if (!todo) {
        throw new NotFoundException('ToDo not found');
      }

      await this.deleteTodoRepository.delete(id);
      this.logger.log('ToDo deleted successfully');
      return todo;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

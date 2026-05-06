import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindTodoByIdRepository, UpdateTodoRepository } from '../repository';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Injectable()
export class UpdateTodoUseCase {
  constructor(
    private readonly updateTodoRepository: UpdateTodoRepository,
    private readonly findTodoByIdRepository: FindTodoByIdRepository,
    private readonly logger: Logger,
  ) {}

  async execute(id: string, data: UpdateTodoDto) {
    try {
      this.logger.log('Updating toDo...');

      const todo = await this.findTodoByIdRepository.findById(id);

      if (!todo) {
        throw new NotFoundException('ToDo not found');
      }

      const updatedTodo = await this.updateTodoRepository.update(id, data);
      this.logger.log('ToDo updated successfully');
      return updatedTodo;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

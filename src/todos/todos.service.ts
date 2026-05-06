import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import {
  CreateTodoUseCase,
  DeleteTodoUseCase,
  FindAllTodosUseCase,
  FindTodoByIdUseCase,
  UpdateTodoUseCase,
} from './use-cases';

@Injectable()
export class TodosService {
  constructor(
    private readonly createTodoUseCase: CreateTodoUseCase,
    private readonly findAllTodosUseCase: FindAllTodosUseCase,
    private readonly findTodoByIdUseCase: FindTodoByIdUseCase,
    private readonly updateTodoUseCase: UpdateTodoUseCase,
    private readonly deleteTodoUseCase: DeleteTodoUseCase,
  ) {}

  async create(data: CreateTodoDto) {
    return await this.createTodoUseCase.execute(data);
  }

  async findAll() {
    return await this.findAllTodosUseCase.execute();
  }

  async findOne(id: string) {
    return await this.findTodoByIdUseCase.execute(id);
  }

  async update(id: string, data: UpdateTodoDto) {
    return await this.updateTodoUseCase.execute(id, data);
  }

  async remove(id: string) {
    return await this.deleteTodoUseCase.execute(id);
  }
}

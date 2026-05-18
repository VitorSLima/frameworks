import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import {
  CreateTodoUseCase,
  DeleteTodoUseCase,
  FindAllTodosUseCase,
  FindTodoByIdUseCase,
  UpdateTodoUseCase,
} from './use-cases';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: CreateTodoUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: FindAllTodosUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: FindTodoByIdUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateTodoUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: DeleteTodoUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

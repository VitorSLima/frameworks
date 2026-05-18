import { Test, TestingModule } from '@nestjs/testing';
import { GUARDS_METADATA } from '@nestjs/common/constants';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

describe('TodosController', () => {
  let controller: TodosController;
  const todosServiceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: todosServiceMock,
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('protects write routes with JWT auth', () => {
    expect(getGuards('create')).toContain(JwtAuthGuard);
    expect(getGuards('update')).toContain(JwtAuthGuard);
    expect(getGuards('remove')).toContain(JwtAuthGuard);
  });

  it('keeps read routes public', () => {
    expect(getGuards('findAll')).toEqual([]);
    expect(getGuards('findOne')).toEqual([]);
  });

  function getGuards(methodName: keyof TodosController) {
    return (
      Reflect.getMetadata(
        GUARDS_METADATA,
        controller[methodName] as object,
      ) ?? []
    );
  }
});

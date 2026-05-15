import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() data: CreateTodoDto) {
    return this.todosService.create(data);
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('private')
  privateRoute(@CurrentUser() user: { id: string; email: string }) {
    return {
      message: 'Rota protegida liberada',
      user,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateTodoDto) {
    return this.todosService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}

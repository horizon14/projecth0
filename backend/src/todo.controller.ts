import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Post()
  create(@Body() todo: Partial<Todo>): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.todoService.remove(id);
  }
}
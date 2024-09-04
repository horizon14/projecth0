import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo, Prisma } from '@prisma/client';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Get()
  async findAll(): Promise<Todo[]> {
    try {
      return await this.todoService.findAll();
    } catch (error) {
      throw new HttpException('Failed to fetch todos', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async create(@Body() createTodoDto: Prisma.TodoCreateInput): Promise<Todo> {
    try {
      return await this.todoService.create(createTodoDto);
    } catch (error) {
      throw new HttpException('Failed to create todo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.todoService.remove(id);

    } catch (error) {
      throw new HttpException('Failed to delete todo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    try {
      const todo = await this.todoService.findOne(id);
      if (!todo) {
        throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
      }
      return todo;
    } catch (error) {
      throw new HttpException('Failed to fetch todo', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post(':id/completed')
  async toggleCompleted(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    try {
      return await this.todoService.toggleCompleted(id);
    } catch (error) {
      throw new HttpException('Failed to toggle todo status', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
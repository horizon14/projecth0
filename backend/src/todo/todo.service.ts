import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Todo, Prisma } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(
    private prisma: PrismaService
  ) { }

  async findAll(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  async create(data: Prisma.TodoCreateInput): Promise<Todo> {
    return this.prisma.todo.create({ data });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.todo.delete({ where: { id } });
  }

  async findOne(id: number): Promise<Todo> {
    return this.prisma.todo.findUnique({ where: { id } });
  }

  async toggleDone(id: number): Promise<Todo> {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new Error('Todo not found');
    }
    const updatedTodo = await this.prisma.todo.update({
      where: { id },
      data: { isDone: !todo.isDone }
    })
    return updatedTodo;
  }
}
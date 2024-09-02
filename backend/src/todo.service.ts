import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  create(todo: Partial<Todo>): Promise<Todo> {
    const newTodo = this.todoRepository.create(todo);
    return this.todoRepository.save(newTodo);
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
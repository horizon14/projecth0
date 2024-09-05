import { TodoService } from './todo.service';
import { Todo, Prisma } from '@prisma/client';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    findAll(): Promise<Todo[]>;
    create(createTodoDto: Prisma.TodoCreateInput): Promise<Todo>;
    remove(id: number): Promise<void>;
    findOne(id: number): Promise<Todo>;
    toggleCompleted(id: number): Promise<Todo>;
}

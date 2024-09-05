import { PrismaService } from '../prisma.service';
import { Todo, Prisma } from '@prisma/client';
export declare class TodoService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Todo[]>;
    create(data: Prisma.TodoCreateInput): Promise<Todo>;
    remove(id: number): Promise<void>;
    findOne(id: number): Promise<Todo>;
    toggleCompleted(id: number): Promise<Todo>;
}

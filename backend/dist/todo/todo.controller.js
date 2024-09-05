"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const common_1 = require("@nestjs/common");
const todo_service_1 = require("./todo.service");
const client_1 = require("@prisma/client");
let TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    async findAll() {
        try {
            return await this.todoService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch todos', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(createTodoDto) {
        try {
            return await this.todoService.create(createTodoDto);
        }
        catch (error) {
            throw new common_1.HttpException('Failed to create todo', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            await this.todoService.remove(id);
        }
        catch (error) {
            throw new common_1.HttpException('Failed to delete todo', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const todo = await this.todoService.findOne(id);
            if (!todo) {
                throw new common_1.HttpException('Todo not found', common_1.HttpStatus.NOT_FOUND);
            }
            return todo;
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch todo', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async toggleCompleted(id) {
        try {
            return await this.todoService.toggleCompleted(id);
        }
        catch (error) {
            throw new common_1.HttpException('Failed to toggle todo status', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.TodoController = TodoController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(':id/completed'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "toggleCompleted", null);
exports.TodoController = TodoController = __decorate([
    (0, common_1.Controller)('todos'),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoController);
//# sourceMappingURL=todo.controller.js.map
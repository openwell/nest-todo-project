import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './create-todo.dto';
import { generate } from 'shortid';
@Injectable()
export class TodoService {
  private todosDb: Todo[] = [];
  findAll(): any {
    return [...this.todosDb];
  }
  create(todoTitle: string, todoDescription: string): any {
    const id = generate();
    const newTodo = new Todo(id, todoTitle, todoDescription);
    this.todosDb = this.todosDb.concat(newTodo);
    return newTodo;
  }
  findOne(id: string): any {
    const todoIndex = this.todosDb.find(elem => elem.id === id);
    if (todoIndex === undefined) {
      throw new NotFoundException();
    }
    return todoIndex;
  }
  deleteById(id: string): any {
    const index = this.todosDb.findIndex(elem => elem.id === id);
    if (index === -1) {
      throw new NotFoundException();
    }
    this.todosDb.splice(index);
    return { message: 'Todo Deleted' };
  }
  UpdateById(id: string, todoTitle: string, todoDescription: string): any {
    const index = this.todosDb.findIndex(elem => elem.id === id);
    if (index === -1) {
      throw new NotFoundException();
    }
    const singleTodo= this.todosDb[index];
    if (todoTitle) {
      singleTodo.todoTitle = todoTitle;
    } else if (todoDescription) {
      singleTodo.todoDescription = todoDescription;
    }
    this.todosDb[index] = singleTodo
    return { message: 'Todo Updated' };
  }
}

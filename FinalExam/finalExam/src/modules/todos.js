import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Todos } from '../resources/data/todo-object';

@inject(Router, Todos)

export class Todo {
  constructor(router, todos) {
    this.router = router;
    this.todos = todos;
    this.message = 'Todos';
    this.showTodoEditForm = false;
  }


  async activate() {
    await this.getTodos();
  }


  attached() {
    feather.replace();
  }


  async getTodos() {
    await this.todos.getTodos();
  }


  newTodo() {
    this.todo = {
      todo: '',
      priotity: '',
      done: ''
    };
    this.openEditForm();
  }


  editTodo(todo) {
    this.todo = todo;
    this.openEditForm();
  }

  openEditForm() {
    this.showTodoEditForm = true;
    setTimeout(() => { $('#todo').focus(); }, 500);
  }

  changeDone(todo) {
    this.todo = todo;
    this.save();
  }


  async save() {
    if (this.todo && this.todo.todo && this.todo.priotity && this.todo.done
    ) {await this.todos.saveTodo(this.todo);}
    await this.getTodos();
    this.back();
  }

  async delete() {
    if (this.todo) {
      await this.todos.delete(this.todo);
      await this.getTodos();
      this.back();
    }
  }

  back() {
    this.showTodoEditForm = false;
  }
}
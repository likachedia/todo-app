import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Task {
  title: string;
  difficulty: string;
  state?: string;
}

export enum State {
  todo = 'To-Do',
  inProgres = 'In Progres',
  done = 'Done',
}

export enum Difficulty {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  

  title: string = 'todo-app';

  todo_list: Task[] = this.parseData('todo_list');
  inProgres_list: Task[] = this.parseData('inProgres_list');
  done_list: Task[] = this.parseData('done_list');
  label_for_task = false;
  label_for_select = false;
  selectedOption: string = '';
  task_title: string = '';
  difficulty = Difficulty;

  parseData(key: string) {
    return JSON.parse(localStorage.getItem(key)!)
      ? JSON.parse(localStorage.getItem(key)!)
      : [];
  }

  saveToLocalStorage(key: string, value: Task[]) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  addTask(title: string, difficulty: string) {
    if (title == '') {
      this.label_for_task = true;
      return;
    }

    if (difficulty == "") {
      this.label_for_select = true;
      return;
    }
    this.label_for_task = false;
    this.label_for_select = false;
    let task: Task = {
      title: title,
      difficulty: difficulty,
      state: State.todo,
    };
    this.todo_list.push(task);
    this.saveToLocalStorage('todo_list', this.todo_list);
    this.selectedOption = '';
    this.task_title = '';
  }

  moveItem(i: number, task: Task) {
    if (task.state == State.todo) {
      task.state = State.inProgres;
      this.inProgres_list.push(task);
      this.todo_list.splice(i, 1);
    } else if (task.state == State.inProgres) {
      task.state = State.done;
      this.done_list.push(task);
      this.inProgres_list.splice(i, 1);
    }
    this.saveToLocalStorage('todo_list', this.todo_list);
    this.saveToLocalStorage('done_list', this.done_list);
    this.saveToLocalStorage('inProgres_list', this.inProgres_list);
  }
  moveItemHandler(item: any) {
    this.moveItem(item.index, item.task);
  }

  moveItemBackHandler(item: any) {
    this.moveItemBack(item.index, item.task);
  }

  deleteTaskHandler (i: number) {
    this.todo_list.splice(i, 1);
    this.saveToLocalStorage('todo_list', this.todo_list);
  }

  moveItemBack(i: number, task: Task) {
    if (task.state == State.inProgres) {
      task.state = State.todo;
      this.todo_list.push(task);
      this.inProgres_list.splice(i, 1);
    } else if (task.state == State.done) {
      task.state = State.inProgres;
      this.inProgres_list.push(task);
      this.done_list.splice(i, 1);
    }

    this.saveToLocalStorage('todo_list', this.todo_list);
    this.saveToLocalStorage('done_list', this.done_list);
    this.saveToLocalStorage('inProgres_list', this.inProgres_list);
  }

  getStyle(difficulty: string) {
    return {
      'btn--easy': difficulty == Difficulty.easy,
      'btn--medium': difficulty == Difficulty.medium,
      'btn--hard': difficulty == Difficulty.hard,
    };
  }
}

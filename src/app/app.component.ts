import { Component, Input } from '@angular/core';

export interface Task {
  title: string,
  difficulty: string,
  state?: string,
}

export enum State {
  todo = 'To-Do',
  inProgres = 'In Progres',
  done = 'Done'
}

export enum Difficulty {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input()
  title:string = 'todo-app';
  card_titels: string[] = ['To-Do', 'In Porgres', 'Done'];
  difficulties = [Difficulty.easy, Difficulty.medium, Difficulty.hard];
  todo_list: Task[] = this.parseData('todo_list');
  list1 = localStorage.getItem("inProgres_list");
  inProgres_list: Task[] = this.parseData('inProgres_list');
  done_list: Task[] = this.parseData('done_list');
  label_for_task = false;
  label_for_select = false;
  selectedOption: string = "";
  task_title: string = "";

  parseData(key: string){
    return JSON.parse(localStorage.getItem(key)!) ? JSON.parse(localStorage.getItem(key)!) : [];
  }

  saveToLocalStorage(key:string, value: Task[]) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  addTask(title: string, difficulty: string) {
    if(title == '') {
      this. label_for_task = true;
      return;
    } 

    if(difficulty == '') {
      this.label_for_select = true;
      return;
    }
    this.label_for_task = false;
    this.label_for_select = false;
    let task: Task = {
      title: title,
      difficulty: difficulty,
      state: State.todo,
    }
    this.todo_list.push(task);
    this.saveToLocalStorage('todo_list', this.todo_list);
    this.selectedOption = "";
    this.task_title = "";
  }

  moveItem(i: number, list: Task[]) {
    if(list[i].state == State.todo) {
      list[i].state = State.inProgres;
      this.inProgres_list.push(list[i]);
      this.todo_list.splice(i, 1);
    } else if(list[i].state == State.inProgres) {
      list[i].state = State.done;
      this.done_list.push(list[i]);
      this.inProgres_list.splice(i, 1);
    }
    this.saveToLocalStorage("todo_list", this.todo_list);
    this.saveToLocalStorage("done_list", this.done_list);
    this.saveToLocalStorage("inProgres_list",  this.inProgres_list);
  }

  deleteItem(i:number) {
    this.todo_list.splice(i, 1);
    this.saveToLocalStorage("todo_list", this.todo_list);
  }

  moveItemBack(i: number, list: Task[]) {
    if(list[i].state == State.inProgres) {
      list[i].state = State.todo;
      this.todo_list.push(list[i]);
      this.inProgres_list.splice(i, 1);
    } else if(list[i].state == State.done) {
      list[i].state = State.inProgres;
      this.inProgres_list.push(list[i]);
      this.done_list.splice(i, 1);
    }

    this.saveToLocalStorage("todo_list", this.todo_list);
    this.saveToLocalStorage("done_list", this.done_list);
    this.saveToLocalStorage("inProgres_list",  this.inProgres_list);
  }

  getStyle(difficulty: string){
    return {
      'btn--easy':  difficulty == Difficulty.easy,
      'btn--medium':  difficulty == Difficulty.medium,
      'btn--hard':  difficulty == Difficulty.hard,
    }
  }
}

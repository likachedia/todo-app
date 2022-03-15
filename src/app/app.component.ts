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
  // empty: TemplateRef | undefined;
  title:string = 'todo-app';
  card_titels: string[] = ['To-Do', 'In Porgres', 'Done'];
  difficulties = [Difficulty.easy, Difficulty.medium, Difficulty.hard];
  todo_list: Task[] = [
    {
      title: 'do homework',
      difficulty: 'medium',
      state: 'todo',
    }
  ];
  inProgres_list: Task[] = [];
  done_list: Task[] = [];
  list_items: Task[] = [
  ];
  task: Task = {
    title: "",
    difficulty: "",
    state: State.done,
  }
  selectedOption: string = "";
  task_title: string = "";

  addTask(title: string, difficulty: string) {
    let task: Task = {
      title: title,
      difficulty: difficulty,
      state: State.done,
    }
    this.todo_list.push(task);
  }

  moveItem(i: number) {
    this.inProgres_list.push(this.todo_list[i])
    this.todo_list.splice(i, 1);
  }
}

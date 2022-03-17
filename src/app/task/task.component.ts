import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item, Difficulty, Task, State } from '../../scripts/interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  @Input() index!: number;
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() itemForward: EventEmitter<Item> = new EventEmitter();
  @Output() itemBack: EventEmitter<Item> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
  state = State;

  deleteItem(i: number) {
    this.delete.emit(i);
  }

  moveItem(i: number, task: Task) {
    this.itemForward.emit({
      index: i,
      task: task,
    });
  }

  moveItemBack(i: number, task: Task) {
    this.itemBack.emit({
      index: i,
      task: task,
    });
  }

  getStyle(difficulty: string) {
    return {
      'btn--easy': difficulty == Difficulty.easy,
      'btn--medium': difficulty == Difficulty.medium,
      'btn--hard': difficulty == Difficulty.hard,
    };
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskInfo, Difficulty } from '../../scripts/interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Output() taskInfo: EventEmitter<TaskInfo> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  label_for_task = false;
  label_for_select = false;
  difficulty = Difficulty;

  selectedOption: Difficulty | undefined = undefined;
  task_title: string = '';

  addTask(title: string, select: Difficulty | undefined) {
    if (title == '') {
      this.label_for_task = true;
      return;
    }

    if (select == null) {
      this.label_for_select = true;
      return;
    }
    this.label_for_task = false;
    this.label_for_select = false;
    this.taskInfo.emit({
      name: title,
      difficulty: select,
    });
    this.selectedOption = undefined;
    this.task_title = '';
  }
}

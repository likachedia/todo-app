export interface Task {
  title: string;
  difficulty: Difficulty;
  state?: State;
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

export interface TaskInfo {
  name: string;
  difficulty: Difficulty | undefined;
}

export interface Item {
  direction: Direction,
  index: number;
  task: Task;
}

export enum Direction {
  Forward,
  Backward,
}
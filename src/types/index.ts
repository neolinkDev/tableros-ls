

export interface Board {
  id: string;
  boardTitle: string;
  lists: List[];
}

export interface List {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  content: string;
  
}
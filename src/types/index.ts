

export type Board = {
  id: string;
  boardTitle: string;
  lists: List[];
}

type List = {
  id: string;
  title: string;
  tasks: Task[];
}

type Task = {
  id: string;
  content: string;
  
}


export enum ActionType {
  CREATE_BOARD,
  UPDATE_BOARD,
  DELETE_BOARD,
  CREATE_LIST,
  UPDATE_LIST,
  CREATE_TASK,
  UPDATE_TASK,
  MOVE_TASK,
  REORDER_TASK,
}

export type BoardAction =
  | { type: ActionType.CREATE_BOARD; payload: { boardTitle: string } }
  | { type: ActionType.UPDATE_BOARD; payload: { id: string; boardTitle: string } }
  | { type: ActionType.DELETE_BOARD; payload: { id: string } }
  | { type: ActionType.CREATE_LIST; payload: { id: string; listTitle: string } }
  | { type: ActionType.UPDATE_LIST; payload: { boardId: string, listId: string, listTitle: string } }
  | { type: ActionType.CREATE_TASK; payload: { boardID: string, listID: string, content: string } }
  | { type: ActionType.UPDATE_TASK; payload: { listID: string, taskID: string, content: string } }
  | { 
      type: ActionType.MOVE_TASK; 
      payload: { 
        boardID: string;
        taskID: string; 
        sourceListID: string; 
        destinationListID: string;
      } 
    }
  | {
      // Nueva acción para reordenar tareas
      type: ActionType.REORDER_TASK;
      payload: {
        boardID: string;
        listID: string;
        fromIndex: number;
        toIndex: number;
      };
    };
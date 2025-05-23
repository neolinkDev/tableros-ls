

export enum ActionType {
  CREATE_BOARD,
  UPDATE_BOARD,
  DELETE_BOARD,
  CREATE_LIST,
  UPDATE_LIST,
  CREATE_TASK,
  // ELIMINAR_LISTA,
  // EDITAR_LISTA,
  // ELIMINAR_TAREA,
  // EDITAR_TAREA,
}

export type BoardAction =
  | { type: ActionType.CREATE_BOARD; payload: { boardTitle: string } }
  | { type: ActionType.UPDATE_BOARD; payload: { id: string; boardTitle: string } }
  | { type: ActionType.DELETE_BOARD; payload: { id: string } }
  | { type: ActionType.CREATE_LIST; payload: { id: string; listTitle: string } }
  | { type: ActionType.UPDATE_LIST; payload: { boardId: string, listId: string, listTitle: string } }
  | { type: ActionType.CREATE_TASK; payload: { boardID: string, listID: string, content: string } }
  // | { type: ActionType.ELIMINAR_LISTA; payload: { tableroId: string; listaId: string } }
  // | { type: ActionType.EDITAR_LISTA; payload: { tableroId: string; listaId: string; nombre: string } }
  // | { type: ActionType.ELIMINAR_TAREA; payload: { tableroId: string; listaId: string; tareaId: string } }
  // | { type: ActionType.EDITAR_TAREA; payload: { tableroId: string; listaId: string; tareaId: string; titulo: string; descripcion: string } };


export enum ActionType {
  CREATE_BOARD,
  UPDATE_BOARD,
  DELETE_BOARD,
  CREATE_LIST,
  UPDATE_LIST,
  // ELIMINAR_LISTA,
  // EDITAR_LISTA,
  // CREAR_TAREA,
  // ELIMINAR_TAREA,
  // EDITAR_TAREA,
}

export type BoardAction =
  | { type: ActionType.CREATE_BOARD; payload: { boardTitle: string } }
  | { type: ActionType.UPDATE_BOARD; payload: { id: string; boardTitle: string } }
  | { type: ActionType.DELETE_BOARD; payload: { id: string } }
  | { type: ActionType.CREATE_LIST; payload: { id: string; listTitle: string } }
  | { type: ActionType.UPDATE_LIST; payload: { boardId: string, listId: string, listTitle: string } }
  // | { type: ActionType.ELIMINAR_LISTA; payload: { tableroId: string; listaId: string } }
  // | { type: ActionType.EDITAR_LISTA; payload: { tableroId: string; listaId: string; nombre: string } }
  // | { type: ActionType.CREAR_TAREA; payload: { tableroId: string; listaId: string; titulo: string; descripcion: string } }
  // | { type: ActionType.ELIMINAR_TAREA; payload: { tableroId: string; listaId: string; tareaId: string } }
  // | { type: ActionType.EDITAR_TAREA; payload: { tableroId: string; listaId: string; tareaId: string; titulo: string; descripcion: string } };
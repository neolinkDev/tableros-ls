

export enum ActionType {
  CREATE_BOARD,
  // ELIMINAR_TABLERO,
  // EDITAR_TABLERO,
  // CREAR_LISTA,
  // ELIMINAR_LISTA,
  // EDITAR_LISTA,
  // CREAR_TAREA,
  // ELIMINAR_TAREA,
  // EDITAR_TAREA,
}

export type BoardAction =
  | { type: ActionType.CREATE_BOARD; payload: { boardTitle: string } }
  // | { type: ActionType.ELIMINAR_TABLERO; payload: { id: string } }
  // | { type: ActionType.EDITAR_TABLERO; payload: { id: string; nombre: string } }
  // | { type: ActionType.CREAR_LISTA; payload: { tableroId: string; nombre: string } }
  // | { type: ActionType.ELIMINAR_LISTA; payload: { tableroId: string; listaId: string } }
  // | { type: ActionType.EDITAR_LISTA; payload: { tableroId: string; listaId: string; nombre: string } }
  // | { type: ActionType.CREAR_TAREA; payload: { tableroId: string; listaId: string; titulo: string; descripcion: string } }
  // | { type: ActionType.ELIMINAR_TAREA; payload: { tableroId: string; listaId: string; tareaId: string } }
  // | { type: ActionType.EDITAR_TAREA; payload: { tableroId: string; listaId: string; tareaId: string; titulo: string; descripcion: string } };
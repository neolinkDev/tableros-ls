import { Board, Task } from "../../types";
import { ActionType, BoardAction } from "./boardActions";
import { updateListInArray } from "./boardReducerHelpers";


export interface BoardState {
  boards: Board[];
}

// export const initialState = {
//   boards: [],
// };

export const boardReducer = (state: BoardState, action: BoardAction): BoardState => {
  
  switch (action.type) {

    // crea un nuevo tablero
    case ActionType.CREATE_BOARD: {
      const newBoard: Board = {
        id: crypto.randomUUID(),
        boardTitle: action.payload.boardTitle,
        lists: [],
      };

      return {
        ...state,
        boards: [...state.boards, newBoard],
      };
    }

    //
    case ActionType.UPDATE_BOARD: {
      const { id, boardTitle } = action.payload;

      const updatedBoards = state.boards.map((board) =>
        board.id === id ? { ...board, boardTitle } : board
      );

      return {
        ...state,
        boards: updatedBoards,
      };
    }

    //
    case ActionType.DELETE_BOARD: {
      // const { id } = action.payload;

      // const boardToDelete = state.boards.filter(( board )=> board.id !== id)

      return {
        ...state,
        boards: state.boards.filter((board) => board.id !== action.payload.id),
      };
    }

    //
    case ActionType.CREATE_LIST: {
      // const { id, listTitle } = action.payload;

      // creates a new list
      const newList = {
        id: crypto.randomUUID(),
        listTitle: action.payload.listTitle,
        tasks: [],
      };

      // if the id matches, it adds the new list to the list array, otherwise it returns the array unchanged
      const updatedBoards = state.boards.map((board) =>
        board.id === action.payload.id
          ? { ...board, lists: [...board.lists, newList] }
          : board
      );

      return {
        ...state,
        boards: updatedBoards,
      };
    }

    //
    case ActionType.UPDATE_LIST: {

      // destructuring the payload
      const { boardId, listId, listTitle } = action.payload;

      // if there is no board with the ID you are looking for, we leave the board as it was
      const updatedBoards = state.boards.map((board) => {

        if (board.id !== boardId) {
          return board; 
        }

        // if it matches, we update the list.
        return {
          ...board,
          lists: updateListInArray(board.lists, listId, listTitle),
        };
      });

      return { 
        ...state, 
        boards: updatedBoards 
      };
    }

    //
    case ActionType.CREATE_TASK: {

      const { boardID, listID, content } = action.payload
      
      // 
      const updatedBoards = state.boards.map(board => {

        // if not the target board, return it unchanged
        if (board.id !== boardID) {
          return board;
        }

        // Found the target board, now map over its lists
        const updatedLists = board.lists.map(list => {

          // If not the target list, return it unchanged
          if (list.id !== listID) {
            return list;
          }

          // found the target list, create the new task
          const newTask: Task = {
            id: crypto.randomUUID(), 
            content,
          };

          // create a new list object with the new task added to its tasks array
          return {
            ...list, 
            tasks: [...list.tasks, newTask]
          };


        })

        // create a new board object with the updated lists array
        return {
          ...board, 
          lists: updatedLists, 
        }
      
      })

      // return the new state with the updated boards array
      return {
        ...state, 
        boards: updatedBoards,
      };

    }

    //
    case ActionType.UPDATE_TASK: {

      const { listID, taskID, content } = action.payload;

      const updatedBoards = state.boards.map(board => {

        // buscar si este board contiene la lista objetivo
        const targetList = board.lists.find(list => list.id === listID);
        
        // si este board no contiene la lista, lo devuelve sin cambios
        if (!targetList) {
          return board;
        }
        
        // si tiene la lista, procede con la actualización
        const updatedLists = board.lists.map(list => {

          if (list.id !== listID) {
            return list;
          }
          
          const updatedTasks = list.tasks.map(task => {
            if (task.id !== taskID) {
              return task;
            }
            // encontró la tarea objetivo, actualiza su contenido inmutablemente
            return { ...task, content };
          });
          
          return { ...list, tasks: updatedTasks };
        });
        
        return { ...board, lists: updatedLists };
      });
      
      return { ...state, boards: updatedBoards };
    }

    case ActionType.MOVE_TASK: {
      const { boardID, taskID, sourceListID, destinationListID } = action.payload;

      // Optimización: Si la tarea se suelta en la misma lista de la que salió,
      // no es necesario hacer ningún cambio en el estado.
      if (sourceListID === destinationListID) {
        return state;
      }

      const updatedBoards = state.boards.map(board => {
        // Buscamos el tablero afectado por el cambio. Los demás se devuelven tal cual.
        if (board.id !== boardID) {
          return board;
        }

        let taskToMove: Task | undefined;

        // Paso 1: Encontrar y eliminar la tarea de la lista de origen.
        // Usamos `map` para crear un nuevo array de listas, manteniendo la inmutabilidad.
        const listsWithTaskRemoved = board.lists.map(list => {
          // Si encontramos la lista de origen...
          if (list.id === sourceListID) {
            // ...buscamos la tarea que se está moviendo para guardarla.
            taskToMove = list.tasks.find(task => task.id === taskID);
            // Devolvemos una nueva versión de la lista, pero sin la tarea movida.
            return {
              ...list,
              tasks: list.tasks.filter(task => task.id !== taskID),
            };
          }
          // Si no es la lista de origen, la devolvemos sin cambios.
          return list;
        });

        // Seguridad: Si por alguna razón la tarea no se encontró, devolvemos el tablero
        // sin cambios para evitar errores.
        if (!taskToMove) {
          return board;
        }

        // Paso 2: Agregar la tarea guardada a la lista de destino.
        // Volvemos a usar `map` sobre el array de listas que ya no contiene la tarea en su lugar original.
        const listsWithTaskAdded = listsWithTaskRemoved.map(list => {
          // Si encontramos la lista de destino...
          if (list.id === destinationListID) {
            // ...devolvemos una nueva versión de la lista con la tarea añadida al final.
            return {
              ...list,
              tasks: [...list.tasks, taskToMove!], // Usamos '!' porque ya hemos verificado que `taskToMove` existe.
            };
          }
          // Si no es la lista de destino, la devolveemos sin cambios.
          return list;
        });

        // Devolvemos una nueva versión del tablero con el array de listas actualizado.
        return {
          ...board,
          lists: listsWithTaskAdded,
        };
      });

      // Finalmente, devolvemos el nuevo estado de la aplicación con el array de tableros actualizado.
      return {
        ...state,
        boards: updatedBoards,
      };
    }

    default:
      return state;
  }
};
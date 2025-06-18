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

      // Return the new state with the updated boards array
      return {
        ...state, // Copy other state properties if any
        boards: updatedBoards,
      };

    }

    default:
      return state;
  }
};
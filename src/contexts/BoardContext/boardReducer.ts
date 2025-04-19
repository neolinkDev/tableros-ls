import { Board } from "../../types";
import { ActionType, BoardAction } from "./boardActions";


export interface BoardState {
  boards: Board[];
}

export const initialState = {
  boards: [],
};

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

    default:
      return state;
  }
};
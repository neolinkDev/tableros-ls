import { Board } from "../../types";
import { ActionType, BoardAction } from "./boardActions";


export interface BoardState {
  boards: Board[];
}

export const initialState: BoardState = {
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

    default:
      return state;
  }
};
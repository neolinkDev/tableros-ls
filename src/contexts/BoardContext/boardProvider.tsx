import { useEffect, useReducer } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { boardReducer } from "./boardReducer";
import { ActionType } from "./boardActions";
import { BoardContext } from "./boardContext";
import type { Board } from "../../types";

// provider
export function BoardProvider({ children }: { children: React.ReactNode }) {

  // obtiene los 'boards' almacenados en `localStorage`
  const [storedBoards, setStoredBoards] = useLocalStorage<Board>('boards-key', []);

  // se inicializa el `reducer` con el state de `localStorage` via el custom hook `useLocalStorage`
  const [state, dispatch] = useReducer(boardReducer, { boards: storedBoards });

  // cada vez que el state de los 'boards' cambie, actualizamos `localStorage`
  useEffect(() => {
    setStoredBoards(state.boards);
  }, [state.boards, setStoredBoards]);

  //
  const createBoard = (boardTitle: string) => {
    dispatch({
      type: ActionType.CREATE_BOARD,
      payload: { boardTitle },
    });
  };

  // ... otras acciones

  return (
    <BoardContext.Provider
      value={{
        boards: state.boards,
        createBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
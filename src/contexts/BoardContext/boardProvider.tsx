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

  //
  const updateBoard = (id: string, boardTitle: string) => {
    dispatch({
      type: ActionType.UPDATE_BOARD,
      payload: { id, boardTitle },
    });
  };

  //
  const deleteBoard = (id: string) => {
    dispatch({
      type: ActionType.DELETE_BOARD,
      payload: { id }
    })
  }

  //
  const createList = (id: string, listTitle: string) => {
    dispatch({
      type: ActionType.CREATE_LIST,
      payload: { id, listTitle }
    })
  }

  const updateList = (boardId: string, listId: string, listTitle: string) => {
    dispatch({
      type: ActionType.UPDATE_LIST,
      payload: { boardId, listId, listTitle },
    });
  };

  const createTask = ( boardID: string, listID: string, content: string) => {
    dispatch({
      type: ActionType.CREATE_TASK,
      payload: { boardID, listID, content}
    })
  }

  const updateTask = (listID: string, taskID: string, content: string) => {
    dispatch({
      type: ActionType.UPDATE_TASK,
      payload: { listID, taskID, content },
    });
  };

  const moveTask = (
    boardID: string,
    taskID: string,
    sourceListID: string,
    destinationListID: string
  ) => {
    dispatch({
      type: ActionType.MOVE_TASK,
      payload: { boardID, taskID, sourceListID, destinationListID },
    });
  };

  // ... otras acciones

  return (
    <BoardContext.Provider
      value={{
        boards: state.boards,
        createBoard,
        updateBoard,
        deleteBoard,
        createList,
        updateList,
        createTask,
        updateTask,
        moveTask
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
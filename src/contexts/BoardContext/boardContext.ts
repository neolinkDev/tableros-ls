import { createContext } from 'react';
// import { BoardState } from './boardReducer';
import { Board } from '../../types';


interface BoardContextType {
  boards: Board[];
  createBoard: (boardTitle: string) => void;
  updateBoard: (id: string, boardTitle: string) => void;
  deleteBoard: (id: string) => void
  // ... similar para listas y tareas
}

// crea el contexto
export const BoardContext = createContext<BoardContextType>(null!);


import { createContext } from 'react';
import { BoardState } from './boardReducer';


interface BoardContextType {
  boards: BoardState;
  createBoard: (boardTitle: string) => void;
  // updateBoard: (id: string, updates: Partial<Board>) => void;
  // ... similar para listas y tareas
}

// crea el contexto
export const BoardContext = createContext<BoardContextType>(null!);


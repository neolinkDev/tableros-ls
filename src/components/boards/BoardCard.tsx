import { Link } from 'react-router';

import type { Board } from '../../types';
import { ActionsMenu } from '../ActionsMenu';

interface BoardCardProps {
  board: Board;
}

export function BoardCard({ board }: BoardCardProps) {
  return (
    <>
      <li key={board.id}>
        <div>
          {/* <div 
                      className="w-full min-w-0 h-24 overflow-hidden rounded-lg leading-[20px] bg-indigo-500 hover:bg-fuchsia-500 transition-all duration-200"
                    > */}
          <div className="w-full min-w-0 h-24 overflow-hidden rounded-lg leading-[20px] relative block p-2 bg-black/20 hover:bg-cyan-500">
            {/* <Link 
                        to={``} 
                        className=""
                      > */}
            {/* <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/30 hover:bg-black/40"></div> */}
            <div className="flex justify-between h-full gap-2">
              <Link
                to={`/boards/${board.id}`}
                className="text-base font-bold break-words p-2"
              >
                {board.boardTitle}
              </Link>

              <div className="relative"> {/* Contenedor para posicionamiento relativo */}
              <ActionsMenu />
            </div>

              {/* <div className="flex justify-around">
                <Link to={`/boards/${board.id}/edit`}>editar</Link>

                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => handleBoardDelete(board.id)}
                >
                  eliminar
                </button>
              </div> */}
            </div>
            {/* </Link> */}
          </div>
        </div>
      </li>
    </>
  );
}

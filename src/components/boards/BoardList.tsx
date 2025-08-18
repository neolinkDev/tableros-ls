import { useContext } from "react";
import { BoardContext } from "../../contexts/BoardContext/boardContext";
import { BoardCard } from "./BoardCard";

export function BoardList() {

  const { boards } = useContext(BoardContext);
 
  return (
    <>
      {
        boards.length ? (
          <ul
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4 my-6"
          >
            {
              boards.map((board)=>(
                <BoardCard key={board.id} board={board} />
              ))
            }
            
          </ul>
        ) : (
          <h3 className="text-center text-[#333] py-20">No tienes tableros aún</h3>
        )
      }
    </>
  );
}

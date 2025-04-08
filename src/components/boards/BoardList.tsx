import { useContext } from "react";
import { BoardContext } from "../../contexts/BoardContext/boardContext";

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
              // boards.map((board) => (
              //   <li key={board.id}>
              //     <div>
                  
              //       <div className="w-full min-w-0 h-24 overflow-hidden rounded-lg leading-[20px] relative block p-2 bg-black/20 hover:bg-cyan-500">
                      
              //         <div className="flex flex-col justify-between h-full gap-2">
              //           <Link
              //             to={`/boards/${board.id}`}
              //             className="text-base font-bold break-words"
              //           >
              //             {board.boardName}
              //           </Link>

              //           <div className="flex justify-around">
              //             <Link to={`/boards/${board.id}/edit`}>editar</Link>

              //             <button
              //               type="button"
              //               className="cursor-pointer"
              //               onClick={() => handleBoardDelete(board.id)}
              //             >
              //               eliminar
              //             </button>
              //           </div>
              //         </div>
              //         {/* </Link> */}
              //       </div>
              //     </div>
              //   </li>
              // ))
            }
          </ul>
        ) : (
          <h3 className="text-center text-[#333] py-20">No tienes tableros aún</h3>
        )
      }
    </>
  );
}

import { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router';

import { BoardContext } from '../../contexts/BoardContext/boardContext';
import { H1 } from '../../components/H1';
import { NewListModal } from '../../components/list/NewListModal';
import List from '../../components/list/List';


export default function ListBoardDetails() {
  
  // usamos `useParams` para obtener el ID del tablero
  const { boardID } = useParams<{ boardID: string }>();

  // context con el estado global de los tableros
  const { boards, createList } = useContext(BoardContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // if the board id does not exist, it redirects to the 404 page.
  if (!boardID) {
    return <Navigate to="/404" replace />;
  }

  // find the board with the id we clicked on
  const boardToShow = boards.find((board) => board.id === boardID);

  // if it does not exist, redirect to 404 page
  if (!boardToShow) {
    return <Navigate to="/404" replace />;
  }

  return (
    <section className="bg-white rounded-md p-2.5">
      <div className="max-w-5xl mx-auto">
        <H1 text={boardToShow.boardTitle} />

        <nav className="my-2">
          {/* <Link to=""> */}
          <button
            type="button"
            className="text-[15px] text-[#008cf6] font-semibold hover:bg-[#ebf5ff] leading-[32px] px-4 rounded-md border-transparent hover:border-[#ebf5ff] border-2 border-solid cursor-pointer"
            onClick={() => setIsModalOpen(true)}
            aria-label="Abrir modal para añadir lista"
            >
            Añadir lista
          </button>
        </nav>
          
        <List lists={boardToShow.lists} />          

        <NewListModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={(title) => {
            createList(boardID, title);
            setIsModalOpen(false);
          }}
        />

      </div>
    </section>
  );
}

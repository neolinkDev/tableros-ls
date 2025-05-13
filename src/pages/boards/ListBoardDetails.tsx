// src/pages/ListBoardDetails.tsx
import { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { toast } from 'sonner';
import { BoardContext } from '../../contexts/BoardContext/boardContext';
import { H1 } from '../../components/H1';
import { NewListModal } from '../../components/list/NewListModal';
import List from '../../components/list/List';

export default function ListBoardDetails() {
  const { boardID } = useParams<{ boardID: string }>();
  
  const { boards, createList, updateList } = useContext(BoardContext);

  // open/close modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  //
  const [selectedListId, setSelectedListId] = useState<string | null>(null);

  if (!boardID) return <Navigate to="/404" replace />;

  const board = boards.find(board => board.id === boardID);
  if (!board) return <Navigate to="/404" replace />;

  // Obtiene la lista a editar, si existe
  const listToEdit = modalMode === 'edit'
    ? board.lists.find(list => list.id === selectedListId)
    : undefined;

  return (
    <section className="bg-white rounded-md p-2.5">
      <div className="max-w-5xl mx-auto">
        <H1 text={board.boardTitle} />

        <nav className="my-2">
          <button
            type="button"
            className="
              text-[15px] text-[#008cf6] font-semibold hover:bg-[#ebf5ff]
              leading-[32px] px-4 rounded-md border-transparent
              hover:border-[#ebf5ff] border-2 border-solid cursor-pointer
            "
            onClick={() => {
              setModalMode('create');
              setSelectedListId(null);
              setIsModalOpen(true);
            }}
            aria-label="Abrir modal para añadir lista"
          >
            Añadir lista
          </button>
        </nav>

        <List
          lists={board.lists}
          onEdit={(listID) => {
            setModalMode('edit');
            setSelectedListId(listID);
            setIsModalOpen(true);
          }}
        />

        <NewListModal
          isOpen={isModalOpen}
          mode={modalMode}
          initialValues={listToEdit ? { listTitle: listToEdit.listTitle } : undefined}
          onClose={() => setIsModalOpen(false)}
          onSubmit={(title) => {
            if (modalMode === 'create') {
              createList(boardID, title);
              toast.success("Lista creada.")
            } else if (selectedListId) {
              updateList(boardID, selectedListId, title);
              toast.success("Lista editada.")
            }
          }}
        />
      </div>
    </section>
  );
}

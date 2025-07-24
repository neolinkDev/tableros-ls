// src/pages/ListBoardDetails.tsx
import { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router';

import { DndContext, DragEndEvent } from '@dnd-kit/core'

import { toast } from 'sonner';

import { BoardContext } from '../../contexts/BoardContext/boardContext';
// import { H1 } from '../../components/H1';
import { NewListModal } from '../../components/list/NewListModal';
import List from '../../components/list/List';

export default function ListBoardDetails() {
  
  const { boardID } = useParams<{ boardID: string }>();
  
  const { boards, createList, updateList, moveTask } = useContext(BoardContext);

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const taskID = active.id;
    const destinationListID = over.id;
    const sourceListID = active.data.current?.sourceListId;

    // 1. `boardID`: El ID del tablero actual, obtenido de los parámetros de la URL.
    // 2. `sourceListID`: El ID de la lista de origen, que adjuntamos en `TaskItem.tsx`.
    // 3. `destinationListID`: El ID de la lista de destino, sobre la cual se soltó la tarea.
    // 4. `taskID`: El ID de la tarea que se está moviendo.
    // 5. `sourceListID !== destinationListID`: Evita que se ejecute la lógica si el usuario
    //    suelta la tarea en su lista original. Esto previene un re-renderizado innecesario.
    if (boardID && sourceListID && destinationListID && taskID && sourceListID !== destinationListID) {
      // Usamos `String()` para asegurar a TypeScript que los valores son de tipo `string`,
      // eliminando así el warning de `UniqueIdentifier`.
      moveTask(String(boardID), String(taskID), String(sourceListID), String(destinationListID));
      toast.success(`Tarea movida exitosamente`);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <section className="bg-white rounded-md p-2.5">
        <div className="max-w-5xl mx-auto">
          {/* <H1 text={board.boardTitle} /> */}
          <h1 className='inline-block font-normal text-2xl text-[#333]'>
            { board.boardTitle }
          </h1>

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
    </DndContext>
  );
}

import { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router';

import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { toast } from 'sonner';

import { BoardContext } from '../../contexts/BoardContext/boardContext';

import { NewListModal } from '../../components/list/NewListModal';
import List from '../../components/list/List';

/**
 * Página que muestra el contenido de un tablero concreto.
 * Contiene el DndContext y maneja drag-and-drop para mover y reordenar tareas.
 */
export default function ListBoardDetails() {
  const { boardID } = useParams<{ boardID: string }>();

  const { boards, createList, updateList, moveTask, reorderTask } =
    useContext(BoardContext);

  // open/close modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  //
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  //
  const [selectedListId, setSelectedListId] = useState<string | null>(null);

  // if (!boardID) return <Navigate to="/404" replace />;
  if (!boardID) return <Navigate to="/404" replace />;

  const board = boards.find((board) => board.id === boardID);
  if (!board) return <Navigate to="/404" replace />;

  // Obtiene la lista a editar, si existe
  const listToEdit =
    modalMode === 'edit'
      ? board.lists.find((list) => list.id === selectedListId)
      : undefined;

  /**
   * Se dispara cuando termina un drag-and-drop de dnd-kit.
   * Determina si la tarea se soltó en otra lista (mover)
   * o en la misma lista (reordenar) y delega la acción
   * correspondiente al reducer.
   */
  const handleDragEnd = (event: DragEndEvent) => {

    /* 
      1) Extraemos el ítem que se arrastra (active)
      y el destino sobre el que se soltó (over)
    */
    const { active, over } = event;

    // Si el usuario suelta fuera de cualquier "droppable", no hace nada
    if (!over) {
      return;
    }

    // 2) Identificamos la tarea que se movió
    const taskID = String(active.id);

    // 3) Lista de origen: dnd-kit la guarda dentro de `data.current`
    const sourceListID =
      (active.data.current && active.data.current.listId) || '';

    // 4) Averiguamos la lista destino según dónde cae el cursor:
    //    - sobre una lista -> `type === 'list'`
    //    - sobre otra tarea -> `type === 'task'`
    let destinationListID: string | undefined;

    if (over.data.current?.type === 'list') {
      destinationListID = String(over.id);
    } else if (over.data.current?.type === 'task') {
      // Si es otra tarea, el destino es la lista de esa tarea
      destinationListID = String(over.data.current.listId);
    }

    // Si por alguna razón no pudimos obtener ambos IDs, abortamos
    if (!sourceListID || !destinationListID) return;

    //  5) Caso A: la tarea se soltó en OTRA lista -> mover de lista
    if (sourceListID !== destinationListID) {
      moveTask(boardID, taskID, sourceListID, destinationListID);
      toast.success('Tarea movida exitosamente');
    } else {

      // Caso B: la tarea se soltó en la MISMA lista -> reordenar
      const list = board.lists.find((l) => l.id === sourceListID);
      if (!list) return;

      // Índice de donde sale la tarea
      const fromIndex = list.tasks.findIndex((t) => t.id === taskID);
      let toIndex: number;

      // Si el destino es otra tarea, tomamos su índice
      if (over.data.current?.type === 'task') {
        toIndex = list.tasks.findIndex((t) => t.id === over.id);
      } else {
        // Si se suelta en la lista en general, mover al final
        toIndex = list.tasks.length - 1;
      }

      /* 
        Solo actualizamos el estado cuando la operación es realmente necesaria:
    
        1. fromIndex !== -1  ->  La tarea arrastrada sigue existiendo en la lista
        2. toIndex   !== -1  ->  La posición destino que calculamos también es válida
        3. fromIndex !== toIndex ->  Hay un cambio de posición; soltar en el mismo
            sitio no aporta nada y evitará un render innecesario
      
        Con estas tres garantías evitamos:
        • Intentar reordenar con índices inválidos (fuera de rango)
        • Llamar al reducer cuando el estado no cambia, ahorrando renders
        • Inconsistencias visuales en drag-and-drop, clave para una UX fluida
          en React, Context + Reducer
      */
      if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
        reorderTask(boardID, sourceListID, fromIndex, toIndex);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <section className="bg-white rounded-md p-2.5">
        <div className="max-w-5xl mx-auto">
         
          <h1 className="inline-block font-normal text-2xl text-[#333]">
            {board.boardTitle}
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
            initialValues={
              listToEdit ? { listTitle: listToEdit.listTitle } : undefined
            }
            onClose={() => setIsModalOpen(false)}
            onSubmit={(title) => {
              if (modalMode === 'create') {
                createList(boardID, title);
                toast.success('Lista creada.');
              } else if (selectedListId) {
                updateList(boardID, selectedListId, title);
                toast.success('Lista editada.');
              }
            }}
          />
        </div>
      </section>
    </DndContext>
  );
}

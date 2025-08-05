// src/components/list/ListColumn.tsx

import { useDroppable } from '@dnd-kit/core';
import { PencilIcon } from '@heroicons/react/20/solid';
import type { List as ListType } from '../../types';
import { TaskItem } from '../task/TaskItem';
import AddTaskToList from '../task/AddTaskToList';

interface ListColumnProps {
  list: ListType;
  onEdit: (listID: string) => void;
}

export function ListColumn({ list, onEdit }: ListColumnProps) {
  /* 
    Usamos useDroppable para hacer que el componente sea un área donde se pueden soltar tareas
    Esto permite que las tareas se muevan entre listas dentro de este componente.
   `setNodeRef` es una función que se usa para asignar la referencia del nodo al elemento HTML. 
  */
  const { setNodeRef } = useDroppable({
    id: list.id,
    data: { type: 'list' }, // etiquetamos este droppable como lista
  });

  return (
    <li
      ref={setNodeRef} // la referencia se asigna al elemento li
      key={list.id}
      className="bg-gray-100 rounded-md shadow-md p-4 w-72 min-h-16 flex-shrink-0"
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold mb-2 break-words">
          {list.listTitle}
        </h3>
        <div className="flex space-x-2">
          <button
            type="button"
            aria-label="Editar lista"
            className="p-1 hover:bg-gray-200 rounded cursor-pointer"
            onClick={() => onEdit(list.id)}
          >
            <PencilIcon className="h-5 w-5 text-blue-500" />
          </button>
        </div>
      </div>

      <ul className="mt-2 space-y-1">
        {list.tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            listID={list.id}
          />
        ))}
      </ul>

      <AddTaskToList listID={list.id} />
    </li>
  );
}

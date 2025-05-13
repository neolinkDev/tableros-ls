// src/components/list/List.tsx
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import type { List as ListType } from '../../types';

interface ListProps {
  lists: ListType[];
  onEdit: (listID: string) => void;      // Recibe callback de edición
}

export default function List({ lists, onEdit }: ListProps) {
  
  if (!lists.length) return <p className="text-center py-20">No hay listas</p>;

  return (
    <div className="min-h-[60vh] overflow-x-auto overflow-y-hidden pb-4">
      <ol className="flex space-x-4 items-start">
        {lists.map(list => (
          <li
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
                <button
                  type="button"
                  aria-label="Eliminar lista"
                  className="p-1 hover:bg-red-100 rounded cursor-pointer"
                  /* onClick={() => handleDeleteList(list.id)} */
                >
                  <TrashIcon className="h-5 w-5 text-red-500" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

import { PencilIcon } from '@heroicons/react/20/solid';
import type { List } from '../../types';
import { TrashIcon } from '@heroicons/react/20/solid';

interface ListProps {
  lists: List[];
}

export default function List({ lists }: ListProps) {
  // console.log(lists);

  if (!lists.length) return <p className="text-center py-20">No hay listas</p>;

  return (
    <>
      <div className="min-h-[60vh] overflow-x-auto overflow-y-hidden pb-4">
        <ol className="flex space-x-4 items-start">
          {
            lists.map((list) => (
              <li
                key={list.id} 
                className="bg-gray-100 rounded-md shadow-md p-4 w-72 min-h-16 flex-shrink-0"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold mb-2 break-words">
                    {list.listTitle}
                  </h3>
                  <div className="flex space-x-2">
                    {/* Icono de editar */}
                    <button
                      type="button"
                      aria-label="Editar lista"
                      className="p-1 hover:bg-gray-200 rounded cursor-pointer"
                      onClick={() => console.log(`editar ${list.id}`)}
                    >
                      <PencilIcon className="h-5 w-5 text-blue-500" />
                    </button>
                    {/* Icono de eliminar */}
                    <button
                      type="button"
                      aria-label="Eliminar lista"
                      className="p-1 hover:bg-red-100 rounded cursor-pointer"
                      /* onClick={() => handleDeleteList(list.id)} */
                    >
                      <TrashIcon className="h-5 w-5 text-red-500" />
                    </button>
                  </div>
                  {/* <button
                      type="button"
                      className="text-gray-500 hover:text-red-500 focus:outline-none text-lg font-bold self-start cursor-pointer"
                      onClick={() => handleDeleteList(list.id)}
                    >
                      X
                    </button> */}
                </div>

                {/* renderizar las tareas de la lista más adelante */}
                {/* <ul className="mt-2 space-y-1">
                    {
                      list.tasks?.map((task) => (
                        <li key={task.id} className="bg-gray-300 p-2 rounded text-sm">
                          {task.taskName}
                        </li>
                      ))
                    }
                  </ul> */}

                {/* list.tasks?.map((task) => (
                        <li key={task.id} className="bg-gray-300 p-2 rounded text-sm flex justify-between">
                          {task.taskName}
                          <button
                            type="button"
                            className="text-yellow-500 hover:text-yellow-600 focus:outline-none text-lg font-bold self-start cursor-pointer"
                            // onClick={() => handleDeleteList(list.id)}
                          >
                            E
                          </button>
                        </li>
                      )) */}

                {/* Componente para agregar nueva tarea */}
                {/* <AddTaskToList board={ board} setBoard={setBoard} listID={list.id}/> */}
              </li>
            ))
          }
        </ol>
      </div>
    </>
  );
}

import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useDraggable, useDroppable } from '@dnd-kit/core';
import { toast } from 'sonner';

import type { Task } from '../../types';
import { BoardContext } from '../../contexts/BoardContext/boardContext';
import DragHandleIcon from '../icons/DragHandleIcon';


interface TaskItemProps {
  task: Task;
  listID: string;
}

// tipo para los valores del formulario de TaskItem 
type TaskFormValues = {
  content: string;
};

export function TaskItem({ task, listID }: TaskItemProps) {

  /* 
    Marca la tarea como draggable. El `id` es el de la tarea y `data.listId`
    almacena la lista de origen, que se usará en handleDragEnd para moverla o reordenarla.
  */
  const { attributes, listeners, setNodeRef: setDraggableRef, transform } = useDraggable({
    id: task.id,
    data: {
      type: 'task',
      listId: listID, // identificamos la lista de origen en el objeto data
    },
  });

  // Configura la tarea como una zona droppable para permitir soltar
  // otras tareas encima de ella al reordenar. Guardamos la misma listId en data.
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: task.id,
    data: {
      type: 'task',
      listId: listID, // también indicamos la lista a la que pertenece
    },
  });

  // Combinamos ambas refs para aplicarlas al mismo nodo
  const setRef = (node: HTMLElement | null) => {
    setDraggableRef(node);
    setDroppableRef(node);
  };

  // Extraemos `updateTask` del context para poder actualizar el contenido
  // de la tarea cuando el usuario edite y guarde.
  const { updateTask } = useContext(BoardContext); 

  // state para controlar si la tarea está en modo de edición
  const [isTaskEditing, setIsTaskEditing] = useState<boolean>(false); 

  // inicia 'react-hook-form'
  const { register, reset, getValues, setValue } = useForm<TaskFormValues>({
    defaultValues: { content: task.content },
  });

  // referencia al input en modo edición para poder enfocarlo
  const inputRef = useRef<HTMLInputElement>(null); 

  useEffect(() => {
    // Cuando pasa a modo edición, cargamos el valor actual y enfocamos
    if (isTaskEditing) {
      reset({ content: task.content }); 
      inputRef.current?.focus();      
      inputRef.current?.select();        
    }
  }, [isTaskEditing, task.content, reset]); 

  // inicia el modo de edición al hacer clic en el texto de la tarea
  const handleTaskClick = (): void => {
    setIsTaskEditing(true);
  };

  // guarda los cambios en la tarea.
  const handleSaveEdit = (): void => {
    const currentContent = getValues('content').trim(); 
    if (currentContent === '') {
      setValue('content', task.content);
      setIsTaskEditing(false);
      return;
    }
    if (currentContent === task.content) {
      setIsTaskEditing(false);
      return;
    }
    updateTask(listID, task.id, currentContent);
    setIsTaskEditing(false);
    toast.success("Tarea actualizada correctamente");
  };

  // maneja las pulsaciones de teclado para guardar o cancelar la edición.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleSaveEdit(); 
    } else if (e.key === 'Escape') {
      setIsTaskEditing(false);                
      setValue('content', task.content); 
    }
  };

  // Destructuring del register para separar ref de otras props
  const { ref: registerRef, ...registerProps } = register('content', { required: true });

  // Aplica transformaciones durante el arrastre
  // `transform` proviene de useDraggable y nos da la posición relativa
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <li
      ref={setRef} // combina refs de draggable y droppable
      style={style}
      className="bg-white p-2 rounded text-sm flex justify-between items-center shadow-xs select-none active:shadow-lg transition-shadow duration-150"
    >
      <div className="flex items-center flex-grow">
        {/* Drag handle al hacer clic y arrastrar desde este botón se inicia el drag */}
        <button
          {...listeners}
          {...attributes}
          className="drag-handle mr-2 cursor-move select-none touch-none"
        >
          <DragHandleIcon className="h-5 w-5 text-gray-600" />

        </button>
         {/* Si está en modo edición, mostramos un input para editar la tarea */}
        {
          isTaskEditing ? (
            <input
              {...registerProps}
              ref={(e) => {
                registerRef(e);
                inputRef.current = e;
              }}
              type="text"
              onBlur={handleSaveEdit}
              onKeyDown={handleKeyDown}
              className="flex-grow bg-white p-1 rounded border border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-inner text-gray-800"
              aria-label="Editar contenido de la tarea"
            />
          ) : (
            <span
              className="flex-grow cursor-pointer text-gray-800 p-1 rounded"
              onClick={handleTaskClick}
              tabIndex={0}
              role="button"
              aria-label={`Tarea: ${task.content}. Haz clic para editar.`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleTaskClick();
                }
              }}
            >
              {task.content}
            </span>
          )
        }
      </div>
      {/* Aquí se puede añadir un botón para eliminar la tarea */}
    </li>
  );
}

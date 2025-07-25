import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useDraggable } from '@dnd-kit/core';
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
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: {
      sourceListId: listID,
    },
  });

  const { updateTask } = useContext(BoardContext); 

  // state para controlar si la tarea está en modo de edición
  const [isTaskEditing, setIsTaskEditing] = useState<boolean>(false); 

  // inicia 'react-hook-form'
  const { register, reset, getValues, setValue } = useForm<TaskFormValues>({
    defaultValues: { content: task.content },
  });

  // referencia al input en modo edición
  const inputRef = useRef<HTMLInputElement>(null); 

  useEffect(() => {
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
    toast.success("Tarea actualizada correctamente");
    setIsTaskEditing(false);
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

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <li
      ref={setNodeRef} // Referencia para el draggable
      style={style}
      className="bg-white p-2 rounded text-sm flex justify-between items-center shadow-xs select-none active:shadow-lg transition-shadow duration-150"
    >
      <div className="flex items-center flex-grow">
        {/* Área para iniciar el drag */}
        <div
          {...listeners}
          {...attributes}
          className="drag-handle mr-2 cursor-move select-none touch-none"
        >
          <DragHandleIcon className="h-5 w-5 text-gray-600" />

        </div>
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
      {/* Aquí puedes añadir un botón para eliminar la tarea si lo deseas */}
    </li>
  );
}

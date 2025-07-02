import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Task } from '../../types';
import { BoardContext } from '../../contexts/BoardContext/boardContext';
import { toast } from 'sonner';

interface TaskItemProps {
  task: Task;
  listID: string;
}

// tipo para los valores del formulario de TaskItem 
type TaskFormValues = {
  content: string;
};

export function TaskItem({ task, listID }: TaskItemProps) {

  const { updateTask } = useContext(BoardContext); 

  // state para controlar si la tarea está en modo de edición
  const [isTaskEditing, setIsTaskEditing] = useState<boolean>(false); 

  // inicia 'react-hook-form'
  // `defaultValues` asegura que el input tenga el contenido actual de la tarea.
  const { register, reset, getValues, setValue } = useForm<TaskFormValues>({
    defaultValues: { content: task.content },
  });

  // referencia al input en modo edición
  const inputRef = useRef<HTMLInputElement>(null); 

  /* 
    se ejecuta cuando `isTaskEditing` cambia a true.
    reinicia el formulario con el contenido de la tarea, enfoca el input y selecciona el texto.
  */
  useEffect(() => {
    if (isTaskEditing) {
     // inicializa el formulario con el valor actual al entrar en modo edición
      reset({ content: task.content }); 

      // enfoca y selecciona el texto para facilitar la edición
      inputRef.current?.focus();      
      inputRef.current?.select();        
    }
  }, [isTaskEditing, task.content, reset]); 

  // inicia el modo de edición al hacer clic en el texto de la tarea
  const handleTaskClick = (): void => {
    setIsTaskEditing(true);
  };

  // guarda los cambios en la tarea.
  // se llama cuando el input pierde el foco (onBlur) o al presionar Enter.
  const handleSaveEdit = (): void => {

    // obtiene el valor actual del input (sin espacios extra)
    const currentContent = getValues('content').trim(); 

    // si está vacío, revierte y cancela edición
    if (currentContent === '') {
      setValue('content', task.content); // Revierte solo cuando está vacío
      setIsTaskEditing(false);
      return;
    }

    // si no hay cambios, cancela edición sin revertir
    if (currentContent === task.content) {
      setIsTaskEditing(false); // NO revierte porque ya tiene el valor correcto
      return;
    }

    // actualiza la tarea en el estado global
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

  return (

    <li
      className="bg-white p-2 rounded text-sm flex justify-between items-center shadow-xs"
    >
      {
        isTaskEditing ? (
          // renderiza un input cuando la tarea está en modo de edición
          <input
             {...registerProps} // Spread de las props del register (onChange, onBlur, name)
            ref={(e) => {
              registerRef(e); // Asigna ref de react-hook-form
              inputRef.current = e; // Asigna nuestro ref personalizado
            }}
            type="text"
            onBlur={handleSaveEdit} // Al perder el foco, intenta guardar los cambios
            onKeyDown={handleKeyDown} // Maneja las teclas Enter y Escape
            className="
              flex-grow bg-white p-1 rounded border border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-500
              shadow-inner text-gray-800
            "
            aria-label="Editar contenido de la tarea" // Etiqueta de accesibilidad
          />
        ) : (
          // renderiza un span con el texto de la tarea cuando no está en modo de edición
          <span
            className={`
              flex-grow cursor-pointer text-gray-800 p-1 rounded
            `}
            onClick={handleTaskClick} // Al hacer clic, inicia el modo de edición
            tabIndex={0} // Hace que el span sea enfocable para accesibilidad de teclado
            role="button" // Indica que el span es un elemento interactivo (botón)
            aria-label={`Tarea: ${task.content}. Haz clic para editar.`} // Etiqueta de accesibilidad
            onKeyDown={(e) => { // Permite iniciar la edición con teclado (Enter o Espacio)
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Previene el comportamiento por defecto de la tecla
                handleTaskClick();
              }
            }}
          >
            {task.content}
          </span>
        )
      }

      {/* Aquí puedes añadir un botón para eliminar la tarea si lo deseas */}
      {/* Ejemplo:
      <button
        type="button"
        aria-label="Eliminar tarea"
        className="ml-2 p-1 hover:bg-red-100 rounded cursor-pointer"
        onClick={() => deleteTask(boardId, listId, task.id)} // Asumiendo que deleteTask también está en el contexto
      >
        <TrashIcon className="h-4 w-4 text-red-500" />
      </button>
      */}
    </li>
   
  );
}

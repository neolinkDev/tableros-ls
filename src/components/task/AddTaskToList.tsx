import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { BoardContext } from '../../contexts/BoardContext/boardContext';
import type { Task } from '../../types';

interface AddTaskToListProps {
  listID: string;
}

export default function AddTaskToList({ listID }: AddTaskToListProps ) {

  const { createTask } = useContext(BoardContext);

  const { boardID } = useParams<{ boardID: string }>();
  // console.log(boardID)
  
  // state to show or not to show the buttons for adding task
  const [isAddingTask, setIsAddingTask] = useState(false);

  //
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { content: "" },
  });

  // Ref y efecto para enfocar el input al abrir el formulario
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isAddingTask) {
      inputRef.current?.focus();
    }
  }, [isAddingTask]);
  
  //
  const handlePlusClick = () => {
    setIsAddingTask(true);
    console.log('click en el boton añadir')
  };

  //
  const handleCancelClick = () => {
    setIsAddingTask(false);
    reset();
  };

  
  // 
  const handleAddTaskClick = (data: {content: Task['content']}) => {
    if (!boardID) {
      toast.error("No se pudo identificar el tablero.");
      return;
    }
    
    createTask(boardID, listID, data.content)
    setIsAddingTask(false);
    reset();
    toast.success("Tarea agregada.")
  }

  if (isAddingTask) {
    return (
      <form
        className="mt-2"
        onSubmit={handleSubmit(handleAddTaskClick)} noValidate
      >
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
          placeholder="Añadir una tarea..."
          id="taskName"
          {...register('content', { required: true })}
          ref={(e) => {
            register('content', { required: true }).ref(e);
            inputRef.current = e;
          }}
        />
        <div className="mt-1">
          <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-xs mr-1 cursor-pointer">
            Agregar
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-xs cursor-pointer"
            onClick={ handleCancelClick }
            type="button"
          >
            Cancelar
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="mt-2">
      <button
        onClick={ handlePlusClick }
        className="text-green-500 hover:text-green-700 focus:outline-none text-sm cursor-pointer"
      >
        + Añadir tarea
      </button>
    </div>
  );
}

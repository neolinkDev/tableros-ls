import { SubmitHandler, useForm } from 'react-hook-form';
import type { Board } from '../types';

// interface BoardFormValues {
//   boardTitle: Board['boardTitle'];
// }

interface BoardFormProps {
  onSubmit: SubmitHandler<Board>;
  isEditing?: boolean; // Prop para indicar si se está editando o creando el tablero
  initialValues?: { boardTitle: string }; // Prop opcional para los valores iniciales
}

export function BoardForm({
  onSubmit,
  isEditing = false,
  initialValues,
}: BoardFormProps) {
  
  const { register, handleSubmit } = useForm<Board>({
    defaultValues: initialValues,
  });

  const submitLabel = isEditing ? 'Guardar cambios' : 'Crear tablero';
  const titleLabel = isEditing
    ? 'Título del tablero a editar'
    : 'Título del tablero';

  return (
    <form
      className="flex flex-col sm:flex-row sm:items-center p-5 max-w-xl mx-auto mt-10 bg-white sm:space-x-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="mb-5 space-y-3 sm:flex-grow">
        <label
          htmlFor="boardTitle"
          className="lock mb-2 text-sm font-medium text-gray-900"
        >
          {titleLabel}
        </label>
        <input
          type="text"
          id="boardTitle"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          {...register('boardTitle', { required: true })}
        />
      </div>

      <input
        type="submit"
        value={submitLabel}
        className="text-white sm:w-auto bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-full text-sm px-5 py-2.5 text-center cursor-pointer font-bold"
        // className="text-white sm:w-auto bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-full text-sm px-5 py-2.5 text-center cursor-pointer font-bold"
      />
    </form>
  );
}

import { useEffect, useRef } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface NewListModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  initialValues?: { listTitle: string };
  onClose: () => void;
  onSubmit: (title: string) => void;
}

type FormValues = { listTitle: string };

export const NewListModal = ({
  isOpen,
  mode,
  initialValues,
  onClose,
  onSubmit,
}: NewListModalProps) => {
  // Si hay valores iniciales estamos en modo edición
  // En modo creación usamos un título vacío
  // si `initialValues` cambia en tiempo de ejecución, llama a `reset` en un useEffect.
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: initialValues || { listTitle: '' },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  // Este efecto se ejecuta cuando el modal se abre o cuando los valores iniciales cambian.
  // Se asegura de que el formulario siempre muestre los datos correctos y
  // pone el foco automáticamente en el campo de texto para mejorar la usabilidad.
  useEffect(() => {
    if (isOpen) {
      reset(initialValues || { listTitle: '' });
      inputRef.current?.focus();
    }
  }, [isOpen, initialValues, reset]);

  // Esta función se llama al enviar el formulario.
  // Ejecuta la lógica de `onSubmit` (crear o editar) y luego
  // limpia y cierra el modal para que todo quede listo para la próxima vez.
  const handleFormSubmit: SubmitHandler<FormValues> = ({ listTitle }) => {
    onSubmit(listTitle);
    reset({ listTitle: '' });
    onClose();
  };

  // separamos la `ref` de las otras propiedades de `register`
  // para poder asignarla a nuestro `inputRef` personalizado.
  const { ref: registerRef, ...registerProps } = register('listTitle', { required: true });

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-list-title"
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={e => e.target === e.currentTarget && onClose()} // Cierra el modal si se hace clic en el fondo oscuro.
    >
      <div
        className="
          bg-white p-6 rounded-md shadow-md
          w-full max-w-md
          mx-4
          max-h-screen overflow-auto
        "
      >
        <h2 id="new-list-title" className="text-lg font-semibold mb-4">
          {mode === 'create' ? 'Agregar Nueva Lista' : 'Editar Lista'}
        </h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <div className="mb-5">
            <label
              htmlFor="listTitle"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nombre de la lista
            </label>
            <input
              id="listTitle"
              aria-required="true"
              {...registerProps} // Aplicamos las propiedades de `register` (como `onChange`, `onBlur`, etc.).
              ref={(e) => {
                registerRef(e); // Conectamos la `ref` de `react-hook-form`.
                inputRef.current = e; // Conectamos nuestra `ref` para poder hacer foco.
              }}
              className="
                block w-full p-2.5 text-sm bg-gray-50 border border-gray-300
                rounded-lg focus:ring-blue-500 focus:border-blue-500
              "
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="
                bg-[#eee] text-[#3C4858] font-semibold py-2 px-4 rounded
                focus:outline-none focus:shadow-outline cursor-pointer
              "
              onClick={() => {
                reset({ listTitle: '' });
                onClose();
              }}
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              className="
                text-[15px] text-[#008cf6] font-semibold hover:bg-[#ebf5ff]
                leading-[32px] px-4 rounded-md border-2 border-solid
                border-[#b2dcfc] hover:border-[#ebf5ff] cursor-pointer
              "
            >
              { mode === 'create' ? 'Añadir' : 'Guardar' }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
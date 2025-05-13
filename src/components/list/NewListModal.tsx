// src/components/NewListModal.tsx
import { useEffect, useRef } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface NewListModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit';                        // Modo del modal
  initialValues?: { listTitle: string };          // Valores iniciales en edición
  onClose: () => void;
  onSubmit: (title: string) => void;              // Unifica creación/edición
}

type FormValues = { listTitle: string };

export const NewListModal = ({
  isOpen,
  mode,
  initialValues,
  onClose,
  onSubmit,
}: NewListModalProps) => {
  // 1. Inicializamos useForm con defaultValues dinámicos,
  //    usando || para cubrir ambos casos (edición o creación).
  //    reset(initialValues || { listTitle: '' }) aplica los valores
  //    correctos al abrir o al cambiar de modo.
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: initialValues || { listTitle: '' },  // Explicación: si initialValues es undefined, usamos un objeto vacío para no romper el formulario.
  });

  const inputRef = useRef<HTMLInputElement>(null);

  // 2. Al abrirse o cambiar initialValues, resembramos el formulario
  //    y ponemos el foco en el <input>
  useEffect(() => {
    if (isOpen) {
      reset(initialValues || { listTitle: '' });        // Se asegura de cargar siempre los valores correctos 
      inputRef.current?.focus();
    }
  }, [isOpen, initialValues, reset]);

  // 3. Envía el formulario y limpia el estado
  const handleFormSubmit: SubmitHandler<FormValues> = ({ listTitle }) => {
    onSubmit(listTitle);
    reset({ listTitle: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-list-title"
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={e => e.target === e.currentTarget && onClose()}  // Cierra al clickear fuera
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
              {...register('listTitle', { required: true })}
              ref={e => {
                register('listTitle', { required: true }).ref(e);
                inputRef.current = e!;
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
              {mode === 'create' ? 'Añadir' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// src/components/NewListModal.tsx
import { useEffect, useRef } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface NewListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string) => void;
}

type FormValues = { listTitle: string };

export const NewListModal  = ({
  isOpen,
  onClose,
  onAdd,
}: NewListModalProps) => {
  //
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { listTitle: '' },
  });

  // Ref para el input y gestión de foco al abrir
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // llama onAdd y limpia formulario
  const onSubmit: SubmitHandler<FormValues> = ({ listTitle }) => {
    onAdd(listTitle);
    reset();
  };

  return (
    <>
      {
        isOpen && (
          // Overlay que cubre toda la pantalla
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-list-title"
            className="fixed inset-0 bg-black/50 flex items-center justify-center"
            onClick={(e) => {
              // asegura que el clic es en el overlay, no en el contenido del modal
              if (e.target === e.currentTarget) {
                onClose();
              }
            }}
          >
            <div
              className="
            bg-white p-6 rounded-md shadow-md
            w-full max-w-md               
            mx-4                         
            max-h-screen overflow-auto   
          "
            >
              {/* Título accesible */}
              <h2 id="new-list-title" className="text-lg font-semibold mb-4">
                Agregar Nueva Lista
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-5">
                  <label
                    htmlFor="listTitle"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Nombre de la lista
                  </label>
                  <input
                    id="listTitle"
                    {...register('listTitle', { required: true })}
                    ref={(e) => {
                      register('listTitle', { required: true }).ref(e);
                      inputRef.current = e;
                    }}
                    className="block w-full p-2.5 text-sm bg-gray-50 border border-gray-300
                  rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    aria-required="true"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="bg-[#eee] text-[#3C4858] font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 cursor-pointer"
                    onClick={() => {
                      reset();
                      onClose();
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="text-[15px] text-[#008cf6] font-semibold hover:bg-[#ebf5ff] leading-[32px] px-4 rounded-md border-[#b2dcfc] hover:border-[#ebf5ff] border-2 border-solid cursor-pointer"
                  >
                    Añadir
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </>
  );
};

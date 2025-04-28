import { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { BoardContext } from '../../contexts/BoardContext/boardContext';
import { H1 } from '../../components/H1';

export default function ListBoardDetails() {
  // usamos `useParams` para obtener el ID del tablero
  const { boardID } = useParams<{ boardID: string }>();

  // context con el estado global de los tableros
  const { boards, createList } = useContext(BoardContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { listTitle: '' },
  });

  //
  const openModal = () => {
    setIsModalOpen(true);
  };

  //
  const closeModal = () => {
    setIsModalOpen(false);
    reset(); // Limpiar el formulario al cerrar
  };

  // if the board id does not exist, it redirects to the 404 page.
  if (!boardID) {
    return <Navigate to="/404" replace />;
  }

  // find the board with the id we clicked on
  const boardToShow = boards.find((board) => board.id === boardID);

  // if it does not exist, redirect to 404 page
  if (!boardToShow) {
    return <Navigate to="/404" replace />;
  }

  const handleAddList = (data: { listTitle: string }) => {
    createList(boardID, data.listTitle);
    // console.log(data.listTitle)
    closeModal();
  };

  return (
    <section className="bg-white rounded-md p-2.5">
      <div className="max-w-5xl mx-auto">
        <H1 text={boardToShow.boardTitle} />

        <nav className="">
          {/* <Link to=""> */}
          <button
            type="button"
            className="text-[15px] text-[#008cf6] font-semibold hover:bg-[#ebf5ff] leading-[32px] px-4 rounded-md border-transparent hover:border-[#ebf5ff] border-2 border-solid cursor-pointer"
            onClick={openModal}
          >
            Añadir lista
          </button>
          {/* </Link> */}

          {
            isModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                <div
                  className="
          bg-white p-6 rounded-md shadow-md
          w-full max-w-md              
          mx-4                          
          max-h-screen overflow-auto    
        "
                >
                  <h2 className="text-lg font-semibold mb-4">
                    Agregar Nueva Lista
                  </h2>

                  <form onSubmit={handleSubmit(handleAddList)} noValidate>
                    <div className="mb-5 space-y-3">
                      <label
                        htmlFor="listName"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Introduce nombre de la lista:
                      </label>
                      <input
                        type="text"
                        id="listName"
                        className="
                bg-gray-50 border border-gray-300 text-gray-900 text-sm
                rounded-lg focus:ring-blue-500 focus:border-blue-500
                block w-full p-2.5
              "
                        {...register('listTitle', { required: true })}
                      />
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="
                bg-[#eee] text-[#3C4858] font-semibold
                py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 cursor-pointer
              "
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="
                text-[15px] text-[#008cf6] font-semibold hover:bg-[#ebf5ff] leading-[32px] px-4 rounded-md border-[#b2dcfc] hover:border-[#ebf5ff] border-2 border-solid cursor-pointer
              "
                      >
                        Añadir
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )
          }
        </nav>
      </div>
    </section>
  );
}

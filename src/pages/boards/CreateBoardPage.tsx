import { useContext } from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { BoardContext } from '../../contexts/BoardContext/boardContext';

import type { Board } from '../../types';
import { H1 } from '../../components/H1';

export function CreateBoardPage() {

  const { createBoard } = useContext(BoardContext);

  //
  const { register, handleSubmit } = useForm<Board>({
    defaultValues: { 
      boardTitle: ""
    }
  });

  //
  const handleFormSubmit = (data: Board) => {
    createBoard(data.boardTitle);
  }

  return (
    <section className="bg-white rounded-md p-2.5">
      <div className="max-w-5xl mx-auto">
        <H1 text="crear tablero" />

        <nav className="">
          <Link to="/">
            <button
              type="button"
              className="text-[15px] text-[#008cf6] font-semibold hover:bg-[#ebf5ff] leading-[32px] px-4 rounded-md border-transparent hover:border-[#ebf5ff] border-2 border-solid cursor-pointer"
            >
              Volver
            </button>
          </Link>
        </nav>

        <form
          className="flex flex-col sm:flex-row sm:items-center p-5 max-w-xl mx-auto mt-10 bg-white sm:space-x-4"
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
        >
          <div className="mb-5 space-y-3 sm:flex-grow">
            <label
              htmlFor="boardName"
              className="lock mb-2 text-sm font-medium text-gray-900"
            >
              Título del tablero
            </label>
            <input
              type="text"
              id="boardName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              // placeholder=""
              {...register('boardTitle', {required: true,})}
            />
          </div>

          <input
            type="submit"
            value="Crear tablero"
            className="text-white sm:w-auto bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 rounded-full text-sm px-5 py-2.5 text-center cursor-pointer font-bold"
          />
        </form>
      </div>
    </section>
  );
}

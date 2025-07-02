import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
// import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { BoardContext } from '../../contexts/BoardContext/boardContext';
import { BoardForm } from '../../components/BoardForm';

import type { Board } from '../../types';
import { H1 } from '../../components/H1';

export function CreateBoardPage() {

  const navigate = useNavigate();

  const { createBoard } = useContext(BoardContext);

  //
  const handleFormSubmit = (data: Board) => {
    createBoard(data.boardTitle);
    toast.success("Tablero creado.")
    navigate("/");
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

        <BoardForm onSubmit={ handleFormSubmit } />

      </div>
    </section>
  );
}

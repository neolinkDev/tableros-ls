import { useContext } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { BoardContext } from "../../contexts/BoardContext/boardContext";
import { Board } from "../../types";
import { H1 } from "../../components/H1";
import { BoardForm } from "../../components/BoardForm";




export default function EditeBoardPage() {

  // Obtener `id` de params
  const { boardID } = useParams<{ boardID: string }>();

  const navigate = useNavigate();

  // context con el estado global de los tableros
  const { boards, updateBoard } = useContext(BoardContext);


  // validaciones con returns anticipados
  if (!boardID) {
    // return <p className="text-red-600">Error: ID de tablero inválido.</p>;
    return <Navigate to="/404" replace />;
  }

  // busca y devuelve el tablero que se va a editar
  const boardToEdit = boards.find((board) => board.id === boardID);

  if (!boardToEdit) {
    // return <p className="text-red-600">Tablero no encontrado.</p>;
    return <Navigate to="/404" replace />;
  }

  // handle del submit
  const handleFormSubmit = (data: Board) => {
    updateBoard(boardID, data.boardTitle);
    toast.success('Tablero editado.');
    navigate('/');
  };


  return (
    <section className="bg-white rounded-md p-2.5">
      <div className="max-w-5xl mx-auto">
        <H1 text="editar tablero" />

        <nav className="">
          <Link to="/">
            <button
              type="button"
              className="text-[15px] text-[#008cf6] font-semibold hover:bg-[#ebf5ff] leading-[32px] px-4 rounded-md border-transparent hover:border-[#ebf5ff] border-2 border-solid cursor-pointer"
              aria-label="Volver al inicio"
            >
              Volver
            </button>
          </Link>
        </nav>

        <BoardForm
          onSubmit={handleFormSubmit}
          isEditing={true}
          initialValues={{ boardTitle: boardToEdit.boardTitle }}
        />
      </div>
    </section>
  )
}

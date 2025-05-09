import { useContext } from 'react';
import { Link } from 'react-router';
import { BoardContext } from '../contexts/BoardContext/boardContext';
import { toast } from 'sonner';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  PencilIcon,
  TrashIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/solid';
import type { Board } from '../types';

interface ActionsMenuProps {
  boardID: Board['id']
}

export function ActionsMenu({ boardID }: ActionsMenuProps) {

  const { deleteBoard } = useContext(BoardContext);

  //
  const handleBoardDelete = () => {
    if (!confirm('¿Eliminar este tablero?')) return;
    deleteBoard(boardID);
    toast.success('Tablero eliminado.');
  }

  return (
    <Menu>
      <MenuButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none cursor-pointer">
        <EllipsisVerticalIcon className="size-5 fill-gray-600" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-52 origin-top-right rounded-lg border border-gray-300 bg-white p-1 text-sm/6 text-[#333] shadow-lg transition duration-75 ease-linear [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <MenuItem>
          <Link
            to={`/boards/${boardID}/edit`}
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100 cursor-pointer"
          >
            <PencilIcon className="size-4 fill-gray-500" />
            Editar
          </Link>
        </MenuItem>

        <MenuItem>
          <button 
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100 cursor-pointer"
            onClick={handleBoardDelete}
          >
            <TrashIcon className="size-4 fill-gray-500" />
            Eliminar
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

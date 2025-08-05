import type { List as ListType } from '../../types';
import { ListColumn } from './ListColumn';

interface ListProps {
  lists: ListType[];
  onEdit: (listID: string) => void;
}

export default function List({ lists, onEdit }: ListProps) {

  if (!lists.length) return <p className="text-center py-20">No hay listas</p>;

  return (
    <div className="min-h-[60vh] overflow-x-auto overflow-y-hidden pb-4">
      <ol className="flex space-x-4 items-start">
        {
          lists.map(list => (
            
            <ListColumn
              key={list.id}
              list={list}
              onEdit={onEdit}
            />
          ))
        }
      </ol>
    </div>
  );
}

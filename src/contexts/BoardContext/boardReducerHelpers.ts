import { List } from '../../types';

// helper function for updating a specific list in the list array
export const updateListInArray = (
  lists: List[],
  listIdToUpdate: string,
  newTitle: string
) => {
  return lists.map((list) =>
    list.id === listIdToUpdate 
      ? { ...list, listTitle: newTitle } 
      : list
  );
};

/** Helper que mueve un elemento en un array */
export function arrayMove<T>(arr: T[], fromIndex: number, toIndex: number): T[] {
  // Hacemos una copia del arreglo original para no modificarlo directamente
  const copy = [...arr];

  // Quitamos un solo elemento desde 'fromIndex' y lo guardamos en 'item'
  // Usamos [item] porque splice devuelve un array y queremos solo ese valor  
  const [item] = copy.splice(fromIndex, 1);

  // Colocamos el elemento en su nueva posición
  // El segundo parámetro es 0 porque no queremos borrar nada, solo insertar
  copy.splice(toIndex, 0, item);

  return copy;
}

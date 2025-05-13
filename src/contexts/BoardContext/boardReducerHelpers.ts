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

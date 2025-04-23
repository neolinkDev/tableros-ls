import { useState } from 'react';
import type { Board, List, Task } from '../types';

// custom hook con la logica para obtener/guardar datos en `localStorage`
export const useLocalStorage = <T extends Board | List | Task>(
  key: string,
  initialValue: T[] = []
) => {

  // lee el valor desde `localStorage` y si no existe o hay un error utiliza el `initialValue`
  const [storedValue, setStoredValue] = useState<T[]>(() => {

    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T[]) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // guarda el nuevo valor en `localStorage` y actualiza el state
  const setValue = (value: T[] | ((prevValue: T[]) => T[])) => {
    
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as [
    T[],
    (value: T[] | ((prevValue: T[]) => T[])) => void
  ];
};

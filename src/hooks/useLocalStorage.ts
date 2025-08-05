import { useState } from 'react';
import type { Board, List, Task } from '../types';

/**
 * Hook genérico que guarda un array en localStorage y devuelve
 * el valor almacenado junto con una función para actualizarlo.
 *
 * @typeParam T Tipo de los elementos del array (por ejemplo, Board, List o Task).
 *
 * @param key Clave en localStorage bajo la que se guardarán los datos.
 * @param initialValue Valor inicial usado si no hay nada en localStorage.
 */
export const useLocalStorage = <T extends Board | List | Task>(
  key: string,
  initialValue: T[] = []
) => {

  // lee el valor desde `localStorage` y si no existe o hay un error utiliza el `initialValue`
  // Por defecto es un array vacío del tipo T
  const [storedValue, setStoredValue] = useState<T[]>(() => {

    try {
      const item = localStorage.getItem(key);

      // Si existe la clave, se parsea como JSON; si no, usamos el valor inicial
      return item ? (JSON.parse(item) as T[]) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // guarda el nuevo valor en `localStorage` y actualiza el state
  /**
   * `setValue` actualiza tanto el estado como localStorage.
   * Puede recibir un array o una función que toma el valor anterior y devuelve el nuevo.
   */
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

   /* 
    `storedValue` es el array persistido y `setValue` es
    la función para actualizarlo (similar a `useState` pero con persistencia) 
  */
  return [storedValue, setValue] as const;
};

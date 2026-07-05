


/** Formato ISO esperado para fechas almacenadas: YYYY-MM-DD */
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Convierte una fecha ISO (YYYY-MM-DD) a formato de visualización (DD/MM/YYYY).
 * Retorna cadena vacía si la fecha no existe o no tiene el formato esperado.
 */
export function formatDisplayDate(isoDate: string | undefined): string {
  if (!isoDate) return '';
  if (!ISO_DATE_PATTERN.test(isoDate)) return '';

  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}
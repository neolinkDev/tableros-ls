# Tableros LS 📋

Aplicación web para organizar proyectos mediante tableros, listas y tareas al estilo Trello. Permite crear múltiples tableros, añadir listas dentro de cada uno y gestionar tareas con soporte de arrastrar y soltar.

![Captura de pantalla](https://github.com/user-attachments/assets/2416fa1c-962e-4c32-bf0e-0bef59b9248c)

## Características ✨

- Creación, edición y eliminación de tableros.
- Añadir y modificar listas dentro de un tablero.
- Añadir, editar y mover tareas entre listas con drag‑and‑drop.
- Persistencia de datos en `localStorage`.
- Notificaciones visuales al crear o modificar elementos.

## Tecnologías principales 🛠️

- React + TypeScript + Vite
- React Router
- @dnd-kit/core (drag‑and‑drop)
- Tailwind CSS
- react-hook-form
- Headless UI y Heroicons
- Sonner (notificaciones)
- UUID

## Scripts disponibles 📜

```bash
npm install     # instala dependencias
npm run dev     # entorno de desarrollo
npm run build   # genera la versión de producción
npm run preview # sirve la compilación para verificación
```
## Uso básico 🚀

1. Clona el repositorio y ejecuta `npm install`.
2. Arranca el servidor de desarrollo con `npm run dev`.
3. Abre `http://localhost:5173` (o el puerto indicado por Vite) en tu navegador.
4. Crea tu primer tablero, listas y tareas. Arrastra las tareas entre listas para reorganizarlas.

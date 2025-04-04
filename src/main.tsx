import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BoardProvider } from './contexts/BoardContext/boardProvider';
import { AppRouter } from './router/AppRouter';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BoardProvider>
      <AppRouter />
    </BoardProvider>
  </StrictMode>
);

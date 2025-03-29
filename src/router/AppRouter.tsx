import { BrowserRouter, Route, Routes } from 'react-router';
import { AppLayout } from '../layouts/AppLayout';
import { DashboardPage } from '../pages/DashboardPage';
import { CreateBoardPage } from '../pages/boards/CreateBoardPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>

          <Route element={<AppLayout />}>
            <Route index path="/" element={<DashboardPage />} />
            <Route path="/boards/create" element={<CreateBoardPage />} />
            
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

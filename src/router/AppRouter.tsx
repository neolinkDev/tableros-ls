import { BrowserRouter, Route, Routes } from 'react-router';
import { AppLayout } from '../layouts/AppLayout';
import { DashboardPage } from '../pages/DashboardPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>

          <Route element={<AppLayout />}>
            <Route index path="/" element={<DashboardPage />} />
            
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

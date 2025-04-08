import { BoardList } from '../components/boards/BoardList';
import { H1 } from '../components/H1';

export function DashboardPage() {
  
  return (
    
      <section className="bg-white rounded-md p-2.5">
        <div className="max-w-5xl mx-auto">

          <H1 text="tableros" />

          <BoardList />
          
        </div>
      </section>
    
  );
}

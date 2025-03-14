import { useState } from 'react';
import Nav from './componant/Nav.jsx';
import DashboardHeader from './componant/DashboardHeader.jsx';

import TaskDetail from './componant/TaskDetail.jsx';
import TestB from './componant/TestB.jsx';


function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Nav />
      <DashboardHeader />
      <TaskDetail/>
      
      
    </div>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { TaskPage } from './pages/TaskPage';
import { TaskProvider } from './contexts/TaskContext';
import { ThemeProvider } from 'styled-components';
import { LIGHT_THEME } from '@admiral-ds/react-ui';

function App() {

  return (
    <ThemeProvider theme={LIGHT_THEME}>
        <TaskProvider>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/task/:id" element={<TaskPage />} />
            </Routes>
            </BrowserRouter>
        </TaskProvider>
    </ThemeProvider>
  );
};

export default App
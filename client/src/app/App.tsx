import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '@pages/Home/Home';
import { TaskPage } from '@pages/TaskPage/TaskPage';
import { ThemeProvider } from 'styled-components';
import { LIGHT_THEME } from '@admiral-ds/react-ui';

function App() {
  return (
    <ThemeProvider theme={LIGHT_THEME}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task/:id" element={<TaskPage />} />
          <Route path="tasks/new" element={<TaskPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

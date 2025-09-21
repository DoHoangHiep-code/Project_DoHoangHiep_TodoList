import {Toaster} from 'sonner';
import {BrowserRouter, Routes, Route} from 'react-router';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  

  return ( 
    <ThemeProvider>
      <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route
          path='/' 
          element={<HomePage/>}
          />

          <Route 
          path='*' 
          element={<NotFound/>}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

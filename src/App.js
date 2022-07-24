import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage, HomePage } from './pages';
import { Header } from './components';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}  exact />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage, HomePage, RegisterPage } from './pages';
import { Header } from './components';
import { PrivateRoute } from './utils';
import { AuthProvider } from './context';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          { /* <Header /> */ }
          <Routes>
            <Route element={<PrivateRoute><HomePage/></PrivateRoute>} path="/" exact></Route>
            <Route element={<LoginPage/>} path="/login" exact />
            <Route element={<RegisterPage />} path="/register" exact />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

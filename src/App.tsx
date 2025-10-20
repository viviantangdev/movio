import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import InTheather from './pages/InTheather';
import Movie from './pages/Movie';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<InTheather />} />
        <Route path='/movies/:movieId' element={<Movie />} />
        {/* Fallback */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
}

export default App;

import ReactModal from 'react-modal';
import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movie from './pages/Movie';
import Movies from './pages/Movies';
import BuyTickets from './pages/BuyTickets';

ReactModal.setAppElement('#root');

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
 
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:movieId' element={<Movie />} />
        <Route path='/movies/:movieId/ticket' element={<BuyTickets />} />
        {/* Fallback */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </>
  );
}

export default App;

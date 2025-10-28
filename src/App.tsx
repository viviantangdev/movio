import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import BuyTicket from './pages/buyTicket/BuyTicket';
import Home from './pages/home/Home';
import InTheather from './pages/inTheather/InTheather';
import Movie from './pages/movie/Movie';
import Navbar from './shared/components/Navbar';
import ScrollToTopButton from './shared/components/ScrollToTopButton';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies/:movieId' element={<Movie />} />
        <Route path='/movies/:movieId/ticket' element={<BuyTicket />} />
        <Route path='/intheather' element={<InTheather />} />
        {/* Fallback */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <ScrollToTopButton />
    </>
  );
}

export default App;

import ReactModal from 'react-modal';
import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import Navbar from './shared/components/Navbar';
import ScrollToTopButton from './shared/components/ScrollToTopButton';
import Home from './pages/home/Home';
import InTheather from './pages/inTheather/InTheather';
import Movie from './pages/movie/Movie';

ReactModal.setAppElement('#root');

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies/:movieId' element={<Movie />} />
        <Route path='/intheather' element={<InTheather />} />
        {/* Fallback */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <ScrollToTopButton />
    </>
  );
}

export default App;

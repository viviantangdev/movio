import ReactModal from 'react-modal';
import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import Navbar from './components/Navbar';
import ScrollToTopButton from './components/ScrollToTopButton';
import Home from './pages/Home';
import InTheather from './pages/InTheather';
import Movie from './pages/Movie';

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

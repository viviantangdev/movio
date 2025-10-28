import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './App.css';
import App from './App.tsx';
import { ModalProvider } from "react-modal-hook";
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <App />
      </ModalProvider>
    </BrowserRouter>
  </StrictMode>
);

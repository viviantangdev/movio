import { useState } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import ReactModal from 'react-modal';

interface ButtonContent {
  icon?: React.ReactNode;
  text?: string;
  className?: string;
}

interface ModalProps {
  button: ButtonContent;
  children: React.ReactNode;
  header: string;
}
const Modal = ({ header, children, button }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`${button.className} flex items-center gap-2`}
      >
        {button.icon}
        {button.text}
      </button>

      {isOpen && (
        <ReactModal
          isOpen
          onRequestClose={() => setIsOpen(false)}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.60)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            },
            content: {
              backgroundColor: '#18181b',
              height: 'fit-content',
              width: 'fit-content',
              margin: 'auto',
              border: 'none',
            },
          }}
        >
          <div className='flex justify-end'>
            <IoCloseCircleOutline
              onClick={() => setIsOpen(false)}
              className='cursor-pointer text-emerald-400 text-2xl'
            />
          </div>
          <p className='font-bold text-lg'>{header}</p>
          <div className='w-full h-1 my-3 bg-zinc-800 ' />
          {children}
        </ReactModal>
      )}
    </>
  );
};

export default Modal;

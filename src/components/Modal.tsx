import { IoCloseCircleOutline } from 'react-icons/io5';
import ReactModal from 'react-modal';
import { useModal } from 'react-modal-hook';

interface ButtonContent {
  icon: React.ReactElement;
  text: string;
}

interface ModalProps {
  button: ButtonContent;
  children: React.ReactElement;
}
const Modal = ({ children, button }: ModalProps) => {
  const [showModal, hideModal] = useModal(() => (
    <ReactModal
      isOpen
      onRequestClose={hideModal}
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
          width:'fit-content',
          margin: 'auto',
          border: 'none',
        },
      }}
    >
      <div className='flex justify-end'>
        <IoCloseCircleOutline
          onClick={hideModal}
          className='text-emerald-400 text-2xl'
        />
      </div>

      <p className='py-3'>Playing trailer</p>
      {children}
    </ReactModal>
  ));

  return (
    <button
      onClick={showModal}
      className='flex items-center gap-2 '
    >
      {button.icon}
      {button.text}
    </button>
  );
};

export default Modal;

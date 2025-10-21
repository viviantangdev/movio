import { IoAlertCircle } from 'react-icons/io5';
import { MdOutlineSearchOff, MdWifiOff } from 'react-icons/md';
type ErrorVariant = 'network' | 'not-found' | 'unknown';

interface ErrorStateProps {
  error?: string | null;
}
const ErrorState = ({ error }: ErrorStateProps) => {
  const normalized = error?.toLowerCase() || '';
  const isNetworkError = normalized.includes('network');
  const isNotFound =
    normalized.includes('404') || normalized.includes('not found');

  const variant: ErrorVariant = isNetworkError
    ? 'network'
    : isNotFound
    ? 'not-found'
    : 'unknown';

  // 🎨 Define variant visuals
  const variants = {
    network: {
      icon: <MdWifiOff className='w-16 h-16 text-gray-500 mb-4' />,
      title: 'No Internet Connection',
      message: 'Please check your connection and try again.',
    },
    'not-found': {
      icon: <MdOutlineSearchOff className='w-16 h-16 text-gray-500 mb-4' />,
      title: 'Movie Not Found',
      message: 'We couldn’t find details for this movie.',
    },
    unknown: {
      icon: <IoAlertCircle className='w-16 h-16 text-gray-500 mb-4' />,
      title: 'Something Went Wrong',
      message: error || 'An unexpected error occurred.',
    },
  };

  const { icon, title, message } = variants[variant];
  return (
    <div className='flex flex-col justify-center items-center h-[100vh]'>
      {icon}

      <h2 className='text-xl font-semibold mb-2'>{title}</h2>
      <p className='text-gray-500 mb-6 max-w-sm'>{message} </p>

      <button
        onClick={() => window.location.reload()}
        className='secondaryButton'
      >
        Reload
      </button>
    </div>
  );
};

export default ErrorState;

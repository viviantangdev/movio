import { BeatLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <BeatLoader
        color='#32b44a'
        cssOverride={{}}
        loading={true}
        margin={2}
        size={15}
        speedMultiplier={0.5}
      />
    </div>
  );
};

export default Loader;

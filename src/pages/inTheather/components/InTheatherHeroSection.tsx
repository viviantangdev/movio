import heroUrl from '../../../assets/hero.jpg';

const InTheatherHeroSection = () => {
  return (
    <div className='relative h-[350px]'>
      <img
        src={heroUrl}
        alt='Cinema Movio'
        className='w-full h-full object-cover opacity-70 [mask-image:linear-gradient(to_bottom,black_85%,transparent)]'
      />

      <div className='absolute inset-0 flex flex-col justify-center items-center gap-7 '>
        <h2>In Theather</h2>
      </div>
    </div>
  );
};

export default InTheatherHeroSection;

import logoUrl from '../assets/logo.svg';

const Logo = () => {
  return (
    <div className='flex items-end gap-1'>
      <img src={logoUrl} alt='Movio' className='h-[35px]' />
      <h1 className='text-xl'>Movio</h1>
    </div>
  );
};

export default Logo;

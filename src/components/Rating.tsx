import { IoStarSharp } from 'react-icons/io5';

interface RatingProps {
  vote: number;
}
const Rating = ({ vote }: RatingProps) => {
  return (
    <div className='flex items-center gap-0.5'>
      <IoStarSharp className='' />
      <p>{vote.toFixed(1)}</p>
    </div>
  );
};

export default Rating;

// import { useState } from 'react';
// import { IoClose, IoSearchOutline } from 'react-icons/io5';
// import MovieCard from '../components/MovieCard';
// import useNowPlaying from '../hooks/useNowPlaying';

// const Movies = () => {
//   const { nowPlayingMovies } = useNowPlaying();
//   const [searchTerm, setSearchTerm] = useState<string>('');

//   const filterMovies = nowPlayingMovies.filter((movie) =>
//     movie.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className='flex flex-col items-center justify-center p-4 gap-7'>
//       {/*Search bar */}
//       <div className='relative flex items-center group'>
//         <IoSearchOutline className='absolute ml-3 pointer-events-none' />
//         <input
//           type='text'
//           name='search'
//           placeholder='Search movie'
//           autoComplete='off'
//           aria-label='Search movie'
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//           }}
//           className='w-full pr-3 pl-10'
//         />
//         <IoClose
//           className='absolute right-3 opacity-0 group-focus-within:opacity-100 transition-smooth cursor-pointer'
//           onClick={() => setSearchTerm('')}
//         >
//           clear
//         </IoClose>
//       </div>

//       {/*Movies */}

//       {filterMovies.length === 0 ? (
//         <div className='flex flex-col items-center justify-center py-16 text-center text-zinc-400'>
//           <p className='text-lg font-medium text-zinc-300'>No matches found.</p>
//           <p className='text-sm text-zinc-500'>
//             Try searching for another movie title!
//           </p>
//         </div>
//       ) : (
//         <div className='grid grid-cols-2 gap-4'>
//           {filterMovies.map((movie, index) => (
//             <MovieCard
//               key={index}
//               movie={movie}
//               movieType='default'
//               index={index}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Movies;

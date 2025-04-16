import { useState } from 'react';
import { motion } from 'framer-motion';
import MovieDetails from './MovieDetails';

interface MovieCardProps {
  title: string;
  year: string;
  type: string;
  poster: string;
  movieID: string;
  timer: number; // This is the delay
}

export default function MovieCard({
  title,
  year,
  type,
  poster,
  timer,
  movieID,
}: MovieCardProps) {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const typeColors: Record<string, string> = {
    movie: 'bg-amber-400',
    series: 'bg-teal-500',
    episode: 'bg-red-500',
  };

  const badgeColor = typeColors[type] ?? 'bg-gray-400';

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: timer * 0.2, // Stagger animation by timer/index
          type: 'spring',
          stiffness: 100,
          damping: 25,
        }}
        className='relative border object-cover rounded shadow-md shadow-slate-700/20 w-50 sm:w-1/3 lg:w-1/4 xl:w-1/4 group'
      >
        <img
          src={poster}
          alt={`Poster of ${title}`}
          className='min-h-full w-full rounded'
          onError={(e) => (e.currentTarget.src = '/fallback-poster.png')}
        />
        <p
          className={`absolute top-5 right-0 text-lg px-6 text-black rounded-tl-sm rounded-bl-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-10 ${badgeColor} `}
        >
          {type}
        </p>
        <div
          className='invisible rounded group-hover:visible px-2 py-3 md:px-4 md:py-4 absolute w-full bottom-0 flex justify-center items-center bg-slate-950/80 flex-col h-full md:top-0 cursor-pointer'
          onClick={() => setShowDetails(true)}
        >
          <p className='text-xs font-bold mb-2 text-white text-center lg:text-lg'>
            {year}
          </p>

          <h3 className='text-lg md:text-xl mb-2 text-white text-center lg:text-2xl'>
            {title}
          </h3>
        </div>
      </motion.div>
      {showDetails && movieID && (
        <MovieDetails
          movieID={movieID}
          resetAction={() => setShowDetails(false)}
        />
      )}
    </>
  );
}

import { motion } from 'framer-motion';
import MovieCard from './MovieCard';

interface Movie {
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  imdbID: string;
}

interface MovieListProps {
  movies: Movie[];
  loading: boolean; // Add a loading prop to track whether data is being fetched
}

export default function MovieList({ movies, loading }: MovieListProps) {
  return (
    <motion.div
      className='flex flex-wrap gap-4 justify-center py-8 max-w-[1080px] m-auto md:gap-8'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Show a loading state while data is being fetched */}
      {loading ? (
        <div className='bg-neutral-800 px-4 py-2 rounded'>
          <p className='text-white'>Loading...</p>
        </div>
      ) : movies && movies.length > 0 ? (
        // Render movies only if they exist
        movies.map((movie, index) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            year={movie.Year}
            type={movie.Type}
            poster={movie.Poster}
            movieID={movie.imdbID}
            timer={index} // Use index as delay
          />
        ))
      ) : (
        // Show "No movies found" message only if there are no movies after loading
        <div className='bg-neutral-800 px-4 py-2 rounded'>
          <p className='text-white'>No movies found. Please try again!</p>
        </div>
      )}
    </motion.div>
  );
}

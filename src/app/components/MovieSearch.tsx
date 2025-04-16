import { useState, useEffect } from 'react';
import MovieList from './MovieList';
import { GoSearch } from 'react-icons/go';

interface Movie {
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  imdbID: string;
}

export default function MovieSearch() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState('summer');
  const [loading, setLoading] = useState(true);

  function search(formData: FormData) {
    const q = formData.get('query') as string | null;
    if (q) {
      setQuery(q);
    }
  }

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const res = await fetch(`/api/movie-search?q=${query}`);
      const data = await res.json();
      setMovies(data);
      setLoading(false);
    };

    fetchMovies();
  }, [query]);

  return (
    <>
      <div className='max-w-[550px] my-3 mx-auto '>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            search(formData);
          }}
          className='flex m-4 gap-2'
        >
          <input
            name='query'
            type='text'
            placeholder='Search...'
            aria-label='Search movies'
            className='flex-1 border bg-slate-50 border-slate-100 text-slate-900 text-sm rounded-lg px-4 py-2 focus:border-primary-700'
          />
          <button
            type='submit'
            aria-label='Search'
            className='border bg-slate-50 border-slate-100 rounded-lg px-2 py-1 cursor-pointer'
          >
            <GoSearch size={28} className='text-secondary-600' />
          </button>
        </form>
      </div>
      <MovieList movies={movies} loading={loading} />
    </>
  );
}

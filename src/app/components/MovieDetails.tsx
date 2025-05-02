import sanitizeHtml from 'sanitize-html';
import { useState, useRef, useEffect } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { FaMoneyBillWave } from 'react-icons/fa';
import { BiLogoImdb } from 'react-icons/bi';
import { TbAwardFilled } from 'react-icons/tb';

function clean(text: string) {
  return sanitizeHtml(text, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

interface MovieDetailsProps {
  movieID: string;
  resetAction: () => void;
}
interface Movie {
  runtime: string;
  rated: string;
  title: string;
  year: string;
  genre: string;
  language: string;
  country: string;
  ratingIMDB: string;
  awards: string;
  boxOffice: string;
  plot: string;
  director: string;
  writer: string;
  actors: string;
}

export default function MovieDetails({
  movieID,
  resetAction,
}: MovieDetailsProps) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isClient, setIsClient] = useState(false); // for hydration fix
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const savedScrollPosition = useRef(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!movieID) return;

    const fetchMovieDetails = async () => {
      const response = await fetch(`/api/movie-details?id=${movieID}`);
      const data = await response.json();

      setMovie({
        runtime: data?.Runtime ?? 'N/A',
        rated: data?.Rated ?? 'N/A',
        title: data?.Title ?? 'N/A',
        year: data?.Year ?? 'N/A',
        genre: data?.Genre ?? 'N/A',
        language: data?.Language ?? 'N/A',
        country: data?.Country ?? 'N/A',
        ratingIMDB: data?.Ratings?.[0]?.Value ?? 'N/A',
        awards: data?.Awards ?? 'N/A',
        boxOffice: data?.BoxOffice ?? 'N/A',
        plot: data?.Plot ?? 'N/A',
        director: data?.Director ?? 'N/A',
        writer: data?.Writer ?? 'N/A',
        actors: data?.Actors ?? 'N/A',
      });
    };

    fetchMovieDetails();
  }, [movieID]);

  useEffect(() => {
    if (movie && dialogRef.current) {
      savedScrollPosition.current = window.scrollY;
      document.body.style.overflow = 'hidden';

      const dialog = dialogRef.current;

      try {
        if (!dialog.open) {
          dialog.showModal();
        }
      } catch (err) {
        console.warn('Fallback dialog open failed:', err);
        dialog.setAttribute('open', 'true'); // fallback if showModal fails
      }
    }
  }, [movie]);

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      resetAction();
      window.scrollTo(0, savedScrollPosition.current);
      document.body.style.overflow = '';
    }
  };

  if (!movie || !isClient) return null;
  return (
    <>
      <dialog
        ref={dialogRef}
        className='absolute w-screen max-w-[40rem] rounded z-100 top-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm m-auto px-6 py-8 open:block'
      >
        <div className='absolute right-0 top-1 flex justify-end p-2'>
          <button className='cursor-pointer' onClick={handleClose}>
            <IoCloseCircleOutline size={24} />
          </button>
        </div>
        <div className='flex gap-2 mb-2'>
          <div className='bg-slate-200 rounded-2xl px-2 py-1 text-xs'>
            {movie.runtime}
          </div>
          <div className='bg-slate-200 rounded-2xl px-2 py-1 text-xs'>
            Rated: {movie.rated}
          </div>
        </div>
        <div className='flex justify-between'>
          <div>
            <h2 className='uppercase text-xl'>
              {clean(movie.title)} {movie.year ? `(${clean(movie.year)})` : ''}
              
            </h2>
            <div>
              <p className='text-xs text-primary-600'>{clean(movie.genre)}</p>
            </div>
          </div>
          <div className='text-right flex flex-col justify-end'>
            <p className='text-xs text-slate-900/70'>{clean(movie.language)}</p>
            <p className='text-xs text-slate-900/70'>{clean(movie.country)}</p>
          </div>
        </div>

        <div className='flex gap-5 py-2 border-t-1 border-slate-200 border-b-1 my-2'>
          <div className='flex items-center gap-1'>
            <BiLogoImdb size={32} />
            <p className='text-xs'>{clean(movie.ratingIMDB)}</p>
          </div>

          <div className='flex items-center gap-1'>
            <TbAwardFilled size={24} />
            <p className='text-xs'>{clean(movie.awards)}</p>
          </div>
          <div className='flex items-center gap-1'>
            <FaMoneyBillWave size={26} />
            <p className='text-xs'>{clean(movie.boxOffice)}</p>
          </div>
        </div>
        <div className='bg-slate-100 p-2 rounded'>
          <h2 className='text-xs font-semibold'>Plot Summary</h2>
          <p className='text-xs text-slate-900/70'>{clean(movie.plot)}</p>
        </div>

        <div className='flex flex-wrap justify-between gap-2 py-2 rounded'>
          <div className='w-full sm:flex-1 bg-slate-100 p-2 rounded'>
            <div className='mb-2'>
              <h2 className='text-xs font-semibold'>Director</h2>
              <p className='text-xs text-slate-900/70'>
                {clean(movie.director)}
              </p>
            </div>
            <div className='mb-2'>
              <h2 className='text-xs font-semibold'>Writers</h2>
              <p className='text-xs text-slate-900/70'>{clean(movie.writer)}</p>
            </div>
          </div>

          <div className='w-full sm:flex-1 bg-slate-100 p-2 rounded'>
            <div className='mb-2'>
              <h2 className='text-xs font-semibold'>Cast</h2>
              <p className='text-xs text-slate-900/70'>{clean(movie.actors)}</p>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default function Footer() {
  return (
    <footer className='bg-neutral-800 flex flex-wrap gap-2 justify-center p-5 mt-4'>
      <p className='bg-slate-200 rounded-2xl px-5 py-2 text-xs'>
        <a
          className='underline'
          href='https://www.omdbapi.com/'
          rel='noopener noreferrer'
        >
          OMDB
        </a>
      </p>
      <p className='bg-slate-200 rounded-2xl px-5 py-2 text-xs'>
        <a
          className='underline'
          href='https://nextjs.org/'
          rel='noopener noreferrer'
        >
          Next.js
        </a>
      </p>
      <p className='bg-slate-200 rounded-2xl px-5 py-2 text-xs'>
        <a
          className='underline'
          href='https://www.typescriptlang.org/'
          rel='noopener noreferrer'
        >
          TypeScript
        </a>
      </p>
      <p className='bg-slate-200 rounded-2xl px-5 py-2 text-xs'>
        <a
          className='underline'
          href='https://tailwindcss.com/'
          rel='noopener noreferrer'
        >
          Tailwindcss
        </a>
      </p>
      <p className='bg-slate-200 rounded-2xl px-5 py-2 text-xs'>
        <a
          className='underline'
          href='https://motion.dev/docs/react-animation'
          rel='noopener noreferrer'
        >
          Framer Motion
        </a>
      </p>
      <p className='bg-slate-200 rounded-2xl px-5 py-2 text-xs'>
        <a
          className='underline'
          href='https://react-icons.github.io/react-icons'
          rel='noopener noreferrer'
        >
          React-icons
        </a>
      </p>
      <p className='bg-slate-200 rounded-2xl px-5 py-2 text-xs'>
        <a
          className='underline'
          href='https://fonts.google.com/'
          rel='noopener noreferrer'
        >
          Google Fonts
        </a>
      </p>
    </footer>
  );
}

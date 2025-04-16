// app/api/movie-details/route.ts
import { NextResponse } from 'next/server';
import sanitizeHtml from 'sanitize-html';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const movieID = searchParams.get('id');

  // Validate 'movieID' to match IMDb format: starts with 'tt' followed by 7–8 digits (e.g., tt1234567)
  if (!movieID || !/^tt\d{7,8}$/.test(movieID)) {
    return NextResponse.json({ error: 'Invalid movie ID' }, { status: 400 });
  }

  const sanitizedID = sanitizeHtml(movieID);

  const apiKey = process.env.OMDB_API_KEY; // NOT public
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Missing OMDB API Key' },
      { status: 500 }
    );
  }

  const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${sanitizedID}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movie details' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import sanitizeHtml from 'sanitize-html';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  // Validate 'query' to allow only letters, numbers, spaces, and hyphens (1–100 chars)
  if (!query || !/^[a-zA-Z0-9\s-]{1,100}$/.test(query)) {
    return NextResponse.json(
      { error: 'Invalid search query' },
      { status: 400 }
    );
  }

  // Sanitize 'query' to remove harmful HTML tags and content
  const sanitizedQuery = sanitizeHtml(query);

  const apiKey = process.env.OMDB_API_KEY;
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${sanitizedQuery}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return NextResponse.json(data.Search || []);
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

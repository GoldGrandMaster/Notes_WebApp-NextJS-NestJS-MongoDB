import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const key = url.searchParams.get('key');

  const res = await fetch(process.env.PATH_URL_BACKEND+'/api/notes/search' + (key && `?key=${key}`), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await res.json();
  return NextResponse.json(data)

}
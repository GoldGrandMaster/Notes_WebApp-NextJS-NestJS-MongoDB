import { NextRequest, NextResponse } from 'next/server';

// Helper function to handle fetch requests
async function fetchAPI(method: string, path: string, body: any = null) {
  const url = `${process.env.PATH_URL_BACKEND}/api/notes/${path}`;
  const headers = {
    'Content-Type': 'application/json',
  };
  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);
  const data = await response.json();
  return data;
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const result = await fetchAPI('GET', params.id);
  return NextResponse.json(result);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const data = await fetchAPI('PUT', params.id, body);
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const data = await fetchAPI('DELETE', params.id);
  return NextResponse.json(data);
}

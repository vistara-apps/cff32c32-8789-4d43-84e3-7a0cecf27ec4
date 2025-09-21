import { NextRequest, NextResponse } from 'next/server';
import { fetchGames } from '@/lib/mock-data';
import { ApiResponse } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const games = await fetchGames();

    const response: ApiResponse<any[]> = {
      data: games,
      success: true,
      message: 'Games fetched successfully'
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching games:', error);

    const errorResponse: ApiResponse<null> = {
      data: null,
      success: false,
      error: 'Failed to fetch games'
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}


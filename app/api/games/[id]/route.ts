import { NextRequest, NextResponse } from 'next/server';
import { fetchGameById, fetchWinProbabilityData } from '@/lib/mock-data';
import { ApiResponse } from '@/lib/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: gameId } = await params;

    if (!gameId) {
      const errorResponse: ApiResponse<null> = {
        data: null,
        success: false,
        error: 'Game ID is required'
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const game = await fetchGameById(gameId);

    if (!game) {
      const errorResponse: ApiResponse<null> = {
        data: null,
        success: false,
        error: 'Game not found'
      };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    const winProbabilityData = await fetchWinProbabilityData(gameId);

    const response: ApiResponse<any> = {
      data: {
        game,
        winProbabilityData
      },
      success: true,
      message: 'Game data fetched successfully'
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching game:', error);

    const errorResponse: ApiResponse<null> = {
      data: null,
      success: false,
      error: 'Failed to fetch game data'
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

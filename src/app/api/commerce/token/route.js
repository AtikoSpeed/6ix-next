import { getServerAccessToken } from '@/utils/commercelayer/server-auth';

/**
 * API route handler to get a Commerce Layer access token
 * Used to avoid exposing credentials in client-side code
 */
export async function GET() {
  try {
    const accessToken = await getServerAccessToken();
    
    return Response.json({
      accessToken,
      success: true
    });
  } catch (error) {
    console.error('Error in token API route:', error);
    
    return Response.json(
      { 
        error: 'Failed to get access token', 
        success: false 
      },
      { status: 500 }
    );
  }
}

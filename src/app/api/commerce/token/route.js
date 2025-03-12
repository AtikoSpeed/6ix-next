import { getServerAccessToken } from '@/utils/commercelayer/server-auth';

/**
 * API route handler to get a Commerce Layer access token
 * Used to avoid exposing credentials in client-side code
 */
export async function GET() {
  console.log('Token API route called');
  
  try {
    console.log('Attempting to get server access token...');
    
    const accessToken = await getServerAccessToken();
    console.log('Token received:', accessToken ? 'Token successfully received' : 'NULL');
    
    if (!accessToken) {
      throw new Error('No access token received from server');
    }
    
    return Response.json({
      accessToken,
      success: true
    });
  } catch (error) {
    console.error('Error in token API route:', error);
    
    return Response.json(
      { 
        error: error.message || 'Failed to get access token', 
        success: false 
      },
      { status: 500 }
    );
  }
}

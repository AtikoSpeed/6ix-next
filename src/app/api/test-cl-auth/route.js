import { getServerAccessToken } from '@/utils/commercelayer/server-auth';

/**
 * API route handler to test Commerce Layer authentication
 */
export async function GET() {
  console.log('Testing Commerce Layer authentication...');
  
  try {
    // Check environment variables
    const envVars = {
      // eslint-disable-next-line no-undef
      clientId: process.env.NEXT_PUBLIC_CL_CLIENT_ID || 'Not set',
      // eslint-disable-next-line no-undef
      clientSecret: process.env.NEXT_PUBLIC_CL_CLIENT_SECRET || 'Not set',
      // eslint-disable-next-line no-undef
      endpoint: process.env.NEXT_PUBLIC_CL_ENDPOINT || 'Not set',
      // eslint-disable-next-line no-undef
      scope: process.env.NEXT_PUBLIC_CL_SCOPE || 'Not set'
    };
    
    // Try to get a token
    let tokenResult = 'Not fetched';
    let tokenError = null;
    
    try {
      const token = await getServerAccessToken();
      tokenResult = token ? 'Successfully fetched' : 'Returned null';
    } catch (error) {
      tokenError = error.message;
    }
    
    return Response.json({
      message: 'Commerce Layer authentication test',
      environmentVariables: envVars,
      token: tokenResult,
      error: tokenError
    });
  } catch (error) {
    console.error('Error in test-cl-auth route:', error);
    
    return Response.json(
      { 
        error: error.message || 'An error occurred', 
        success: false 
      },
      { status: 500 }
    );
  }
}

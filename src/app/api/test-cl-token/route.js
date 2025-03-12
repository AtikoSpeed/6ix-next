import { getServerAccessToken } from '@/utils/commercelayer/server-auth';

/**
 * API route to test Commerce Layer token generation
 */
export async function GET() {
  try {
    // Log that we're starting the token fetch
    console.log('Starting Commerce Layer token test...');
    
    // Get all environment variables related to Commerce Layer
    const envVars = {
      // eslint-disable-next-line no-undef
      clientId: process.env.NEXT_PUBLIC_CL_CLIENT_ID || 'Not set',
      // eslint-disable-next-line no-undef
      scope: process.env.NEXT_PUBLIC_CL_SCOPE || 'Not set',
      // eslint-disable-next-line no-undef
      endpoint: process.env.NEXT_PUBLIC_CL_ENDPOINT || 'Not set',
    };
    
    console.log('Commerce Layer environment variables:', envVars);
    
    // Attempt to get a token
    console.log('Requesting token...');
    const token = await getServerAccessToken();
    
    const tokenSummary = token 
      ? { status: 'success', length: token.length, preview: `${token.substring(0, 10)}...` }
      : { status: 'failed', error: 'No token returned' };
    
    console.log('Token result:', tokenSummary);
    
    // Return the results
    return Response.json({
      environmentVariables: envVars,
      token: tokenSummary,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in test-cl-token API route:', error);
    
    // Return the error
    return Response.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}

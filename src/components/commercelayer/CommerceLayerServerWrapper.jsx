"use server";

import { cookies } from 'next/headers';
import { getCommerceLayerToken } from '@/utils/commercelayer/server-actions';
import CommerceLayerClient from './CommerceLayerClient';

/**
 * Server component wrapper for Commerce Layer
 * - Fetches token server-side
 * - Passes token to client component
 */
export default async function CommerceLayerServerWrapper({ children }) {
  let token = null;
  /* eslint-disable-next-line no-undef */
  const endpoint = process.env.NEXT_PUBLIC_CL_ENDPOINT;
  
  try {
    // Always use await with cookies() as per the requirements
    const cookieStore = await cookies();

    // Try to get token from cookie first
    const cookieToken = cookieStore.get('cl_auth_token')?.value;
    
    // If no token in cookie, fetch a new one
    if (!cookieToken) {
      try {
        // Get a token via server action
        const data = await getCommerceLayerToken();
        if (data?.accessToken) {
          token = data.accessToken;
          
          // Token will be available for this request only
          // Cookie will be set by the API route itself, not here
        } else {
          console.error('No access token in response');
        }
      } catch (error) {
        console.error('Error fetching Commerce Layer token:', error);
      }
    } else {
      token = cookieToken;
    }
  } catch (error) {
    console.error('Error accessing cookies:', error);
  }

  // Only render if we have required values
  if (!token || !endpoint) {
    console.error('Missing token or endpoint for Commerce Layer');
    return children;
  }
  
  // Pass token and endpoint to client component
  return (
    <CommerceLayerClient 
      token={token} 
      endpoint={endpoint}
    >
      {children}
    </CommerceLayerClient>
  );
}

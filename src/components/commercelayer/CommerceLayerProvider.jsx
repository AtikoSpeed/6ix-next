"use server";

import { cookies } from 'next/headers';
import { getCommerceLayerToken } from '@/utils/commercelayer/server-actions';
import CommerceLayerClient from './CommerceLayerClient';

/**
 * Optimized Commerce Layer Provider - Server Component
 * This combines the Provider and ServerWrapper functionality into a single component
 * - Fetches token server-side
 * - Handles error states
 * - Passes token and endpoint to client component
 */
export default async function CLProvider({ children }) {
  let token = null;
  let errorMessage = null;
  
  // Get Commerce Layer endpoint from env
  /* eslint-disable-next-line no-undef */
  const endpoint = process.env.NEXT_PUBLIC_CL_ENDPOINT;
  
  try {
    // Always use await with cookies() as required
    const cookieStore = await cookies();
    
    // Try to get token from cookie first
    const cookieToken = cookieStore.get('cl_auth_token')?.value;
    
    if (cookieToken) {
      // Use existing token from cookie
      token = cookieToken;
    } else {
      // Fetch new token via server action
      const { accessToken, error } = await getCommerceLayerToken();
      
      if (accessToken) {
        token = accessToken;
      } else {
        errorMessage = error || 'Failed to fetch Commerce Layer token';
      }
    }
  } catch (error) {
    errorMessage = error.message || 'Error setting up Commerce Layer';
    console.error('Commerce Layer provider error:', error);
  }
  
  // Handle error states
  if (!endpoint) {
    console.error('Commerce Layer endpoint not configured in environment variables');
    return <div>Commerce Layer configuration error: Missing endpoint</div>;
  }
  
  if (errorMessage) {
    console.error('Commerce Layer error:', errorMessage);
    return <div>Commerce Layer error: {errorMessage}</div>;
  }
  
  if (!token) {
    return <div>Initializing Commerce Layer...</div>;
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

"use server";

import { getCommerceLayerConfig, CL_AUTH_COOKIE } from './config';

/**
 * Server Action: Fetch Commerce Layer token
 * @returns {Promise<{accessToken: string|null, error: string|null}>}
 */
export async function getCommerceLayerToken() {
  try {
    // Get app configuration including the origin for absolute URLs
    const { appUrl } = getCommerceLayerConfig();
    
    // Use absolute URL for server component fetch as required
    const response = await fetch(`${appUrl}/api/commerce/token`, {
      cache: 'no-store' // Ensure we always get a fresh token
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch token: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success || !data.accessToken) {
      throw new Error('Invalid token response format');
    }
    
    return { accessToken: data.accessToken, error: null };
  } catch (error) {
    console.error('Error fetching Commerce Layer token:', error);
    return { accessToken: null, error: error.message };
  }
}

/**
 * Server Action: Set Commerce Layer token cookie via API route
 * @param {string} token - The access token to store
 * @returns {Promise<boolean>} Success status
 */
export async function setCommerceLayerTokenCookie(token) {
  if (!token) return false;
  
  try {
    // Get app URL for absolute path construction
    const { appUrl } = getCommerceLayerConfig();
    const url = `${appUrl}/api/cookies`;
    
    // Use the Route Handler to set the cookie
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name: CL_AUTH_COOKIE, 
        value: token,
        options: { maxAge: 86400, path: '/' }
      }),
      cache: 'no-store',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to set cookie');
    }
    
    return true;
  } catch (error) {
    console.error('Error setting Commerce Layer token cookie:', error);
    return false;
  }
}

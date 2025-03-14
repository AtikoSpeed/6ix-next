"use server";

export async function getCommerceLayerToken() {
  try {
    // We need to use an absolute URL from server components
    // Construct a proper URL with origin
    // eslint-disable-next-line no-undef
    const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:45000';
    const response = await fetch(`${origin}/api/commerce/token`, {
      cache: 'no-store' // Ensure we always get a fresh token
      // Removed conflicting revalidate option
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

export async function setCommerceLayerTokenCookie(token) {
  if (!token) return false;
  
  try {
    // We need to use an absolute URL from server components
    // Construct a proper URL with origin
    // eslint-disable-next-line no-undef
    const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:45000';
    const url = `${origin}/api/cookies`;
    
    // Use the Route Handler to set the cookie
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
      // Ensure we don't use cache
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

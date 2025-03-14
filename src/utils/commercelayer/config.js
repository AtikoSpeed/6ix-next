/**
 * Commerce Layer Configuration
 * Centralized configuration values for Commerce Layer integration
 */

// Cookie name for storing the auth token
export const CL_AUTH_COOKIE = 'cl_auth_token';

// Token expiration time in seconds (1 day)
export const CL_TOKEN_EXPIRY = 86400;

// Get environment configurations with proper fallbacks
export function getCommerceLayerConfig() {
  /* eslint-disable no-undef */
  return {
    endpoint: process.env.NEXT_PUBLIC_CL_ENDPOINT || '',
    clientId: process.env.NEXT_PUBLIC_CL_CLIENT_ID || '',
    scope: process.env.NEXT_PUBLIC_CL_SCOPE || '',
    appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:45000'
  };
  /* eslint-enable no-undef */
}

// Utility to clean the endpoint URL (remove trailing slash)
export function cleanEndpointUrl(url) {
  if (!url) return '';
  return url.replace(/\/$/, '');
}

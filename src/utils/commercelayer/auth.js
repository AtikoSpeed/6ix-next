"use client";

/**
 * Client-side Commerce Layer token utilities
 * Optimized for use in client components only
 */

import Cookies from 'js-cookie';
import { CL_AUTH_COOKIE, CL_TOKEN_EXPIRY } from './config';

/**
 * Store the Commerce Layer access token in a cookie
 * @param {string} token - The access token
 * @returns {boolean} Success status
 */
export function storeAccessToken(token) {
  if (!token) return false;
  
  try {
    // Use centralized cookie name and expiration from config
    Cookies.set(CL_AUTH_COOKIE, token, { 
      expires: CL_TOKEN_EXPIRY / 86400, // Convert seconds to days
      path: '/',
      sameSite: 'lax' 
    });
    return true;
  } catch (error) {
    console.error('Error storing Commerce Layer token:', error);
    return false;
  }
}

/**
 * Get the Commerce Layer access token from the cookie
 * @returns {string|null} The access token or null if not found
 */
export function getAccessToken() {
  try {
    return Cookies.get(CL_AUTH_COOKIE) || null;
  } catch (error) {
    console.error('Error retrieving Commerce Layer token:', error);
    return null;
  }
}

/**
 * Clear the Commerce Layer access token
 * @returns {boolean} Success status
 */
export function clearAccessToken() {
  try {
    Cookies.remove(CL_AUTH_COOKIE, { path: '/' });
    return true;
  } catch (error) {
    console.error('Error clearing Commerce Layer token:', error);
    return false;
  }
}

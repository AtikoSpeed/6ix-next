"use client";

/**
 * Client-side utility for working with Commerce Layer tokens
 */

import Cookies from 'js-cookie';

const CL_TOKEN_COOKIE = 'cl_token';

/**
 * Store the Commerce Layer access token in a cookie
 * @param {string} token - The access token
 */
export function storeAccessToken(token) {
  Cookies.set(CL_TOKEN_COOKIE, token, { expires: 1 }); // 1 day expiration
}

/**
 * Get the Commerce Layer access token from the cookie
 * @returns {string|null} The access token or null if not found
 */
export function getAccessToken() {
  return Cookies.get(CL_TOKEN_COOKIE) || null;
}

/**
 * Clear the Commerce Layer access token
 */
export function clearAccessToken() {
  Cookies.remove(CL_TOKEN_COOKIE);
}

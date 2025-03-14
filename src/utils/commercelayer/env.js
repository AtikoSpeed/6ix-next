/* eslint-disable no-undef */
/**
 * Environment variable configuration for Next.js
 * This file centralizes environment variable access
 * to avoid 'process is not defined' linting errors
 */

// Sanity configuration
export const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const SANITY_API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';

// Commerce Layer configuration
export const CL_CLIENT_ID = process.env.NEXT_PUBLIC_CL_CLIENT_ID || '';
export const CL_ENDPOINT = process.env.NEXT_PUBLIC_CL_ENDPOINT || '';
export const CL_SCOPE = process.env.NEXT_PUBLIC_CL_SCOPE || '';

// Environment check
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

'use server';

import React from 'react';
import CommerceLayerClient from './CommerceLayerClient'; 
import { getServerAccessToken } from '@/utils/commercelayer/server-auth'; 
import { getCommerceLayerConfig } from '@/utils/commercelayer/config'; 

/**
 * Server Component: Fetches the Commerce Layer token server-side
 * and renders the CommerceLayerClient component with the token and endpoint.
 */
export default async function CLProvider({ children }) {
  let accessToken = null;
  let errorMessage = null;
  const { endpoint } = getCommerceLayerConfig();

  if (!endpoint) {
    errorMessage = "Commerce Layer endpoint is not configured.";
    console.error("[CLProvider Server]", errorMessage);
    // Render children without provider if endpoint is missing
    return <>{children}</>; 
  }

  try {
    accessToken = await getServerAccessToken();
    if (!accessToken) {
      errorMessage = "[CLProvider Server] Failed to retrieve access token (token is null/undefined).";
      console.error(errorMessage);
      // Still render client, but explicitly pass null token
      accessToken = null; 
    } else {
      console.log("[CLProvider Server] Successfully fetched access token.");
    }
  } catch (error) {
    errorMessage = `[CLProvider Server] Error fetching Commerce Layer token: ${error.message}`;
    console.error(errorMessage);
    accessToken = null; 
  }

  console.log("[CLProvider Server] Rendering Client with:", { endpoint, hasToken: !!accessToken });

  // Render the Client Component, passing the token (or null) and endpoint
  return (
    <CommerceLayerClient accessToken={accessToken} endpoint={endpoint}>
      {children}
    </CommerceLayerClient>
  );
}

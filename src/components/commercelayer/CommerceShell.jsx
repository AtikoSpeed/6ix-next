"use client";

import { CommerceLayerProvider } from '@commercelayer/react-components';
import { useEffect, useState } from 'react';

/**
 * A Commerce Layer provider component that wraps your app
 * to provide Commerce Layer functionality throughout your site
 */
export default function CommerceShell({ children }) {
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // Fetch a token from your API route
        const response = await fetch('/api/commerce/token');
        
        if (!response.ok) {
          throw new Error('Failed to fetch Commerce Layer token');
        }
        
        const { accessToken } = await response.json();
        setAccessToken(accessToken);
      } catch (error) {
        console.error('Error fetching Commerce Layer token:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  // Don't show loading indicator to avoid flickering UI
  // Just render children without Commerce Layer if token isn't available
  if (loading || !accessToken) {
    return children;
  }

  return (
    <CommerceLayerProvider
      accessToken={accessToken}
      endpoint={process.env.NEXT_PUBLIC_CL_ENDPOINT}
    >
      {children}
    </CommerceLayerProvider>
  );
}

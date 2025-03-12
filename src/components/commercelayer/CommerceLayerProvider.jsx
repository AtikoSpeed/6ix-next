"use client";

import { CommerceLayerProvider } from '@commercelayer/react-components';
import { useEffect, useState } from 'react';
import { getAccessToken, storeAccessToken } from '@/utils/commercelayer/auth';

export default function CLProvider({ children }) {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // First check if we already have a token stored in cookies
        let accessToken = getAccessToken();
        
        // If no token is found, fetch a new one from the server
        if (!accessToken) {
          // We'll need to create an API route to fetch the token securely
          const response = await fetch('/api/commerce/token');
          
          if (!response.ok) {
            throw new Error('Failed to fetch access token from API');
          }
          
          const data = await response.json();
          accessToken = data.accessToken;
          
          // Store the token in cookies for future use
          if (accessToken) {
            storeAccessToken(accessToken);
          }
        }
        
        setToken(accessToken);
      } catch (error) {
        console.error('Error fetching Commerce Layer access token:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  if (loading) {
    return <div>Loading commerce data...</div>;
  }

  if (!token) {
    return <div>Error loading commerce data. Please try again later.</div>;
  }

  return (
    <CommerceLayerProvider
      accessToken={token}
      endpoint={process.env.NEXT_PUBLIC_CL_ENDPOINT}
    >
      {children}
    </CommerceLayerProvider>
  );
}

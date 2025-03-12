"use client";

import { CommerceLayer } from '@commercelayer/react-components';
import { useEffect, useState } from 'react';
import { getAccessToken, storeAccessToken } from '@/utils/commercelayer/auth';

export default function CLProvider({ children }) {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // First check if we already have a token stored in cookies
        let accessToken = getAccessToken();
        
        // Always fetch a new token to ensure we have a fresh one
        // This fixes potential 401 errors if the token is near expiration
        try {
          console.log('Fetching Commerce Layer token...');
          const response = await fetch('/api/commerce/token');
          
          if (!response.ok) {
            throw new Error(`Failed to fetch token: ${response.status}`);
          }
          
          const data = await response.json();
          
          if (!data.success || !data.accessToken) {
            throw new Error('Invalid token response format');
          }
          
          // Save new token
          accessToken = data.accessToken;
          storeAccessToken(accessToken);
          console.log('New token stored successfully');
        } catch (error) {
          console.error('Error fetching token:', error);
          // If we already have a token, continue using it
          if (!accessToken) {
            setError(error.message);
          }
        }
        
        setToken(accessToken || '');
      } catch (error) {
        console.error('Error with Commerce Layer authentication:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center p-8">Loading commerce data...</div>;
  }

  if (error || !token) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-red-500 mb-2">Error loading commerce data{error ? `: ${error}` : ''}.</p>
        <p>Please try again later or contact support if the problem persists.</p>
      </div>
    );
  }

  // eslint-disable-next-line no-undef
  const endpoint = process.env.NEXT_PUBLIC_CL_ENDPOINT || 'https://6ixarchive.commercelayer.io';
  
  return (
    <CommerceLayer
      accessToken={token}
      endpoint={endpoint}
    >
      {children}
    </CommerceLayer>
  );
}

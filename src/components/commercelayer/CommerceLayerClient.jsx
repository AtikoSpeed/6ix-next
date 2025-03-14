"use client";

import { useState, useEffect, useRef } from 'react';
import { CommerceLayer } from '@commercelayer/react-components';

/**
 * Client Component for Commerce Layer integration
 * Receives token and endpoint from server component
 */
export default function CommerceLayerClient({ token, endpoint, children }) {
  // Track initialization to prevent render loop
  const initialized = useRef(false);
  // Optional loading state if needed
  const [isLoading, setIsLoading] = useState(false);

  // Save token to cookie on client side if needed
  useEffect(() => {
    // Only run once when props change
    if (!initialized.current && token && endpoint) {
      initialized.current = true;
      
      // Use an async function to handle any side effects
      // This prevents state updates during render phase
      const initializeAuth = async () => {
        setIsLoading(true);
        try {
          // Optionally save token to cookie on the client side
          // Only if not already present from server
          const cookies = document.cookie.split(';');
          const hasTokenCookie = cookies.some(cookie => 
            cookie.trim().startsWith('cl_auth_token='));
          
          if (!hasTokenCookie) {
            // Make API call to set cookie instead of direct document.cookie
            // This prevents issues with SameSite cookies
            await fetch('/api/commerce/token/save', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token }),
              credentials: 'include'
            });
          }
        } catch (error) {
          console.error('Error initializing Commerce Layer auth:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      // Call the async function
      initializeAuth();
    }
    
    // Reset initialization when props change
    return () => {
      initialized.current = false;
    };
  }, [token, endpoint]);

  // If not ready yet, show loading or nothing
  if (isLoading) {
    return <div>Initializing Commerce Layer...</div>;
  }

  // Render Commerce Layer provider with passed props
  return (
    <CommerceLayer
      accessToken={token}
      endpoint={endpoint}
    >
      {children}
    </CommerceLayer>
  );
}

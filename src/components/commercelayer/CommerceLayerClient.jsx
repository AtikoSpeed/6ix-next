"use client";

import { useEffect, useRef } from 'react';
import { CommerceLayer } from '@commercelayer/react-components';

/**
 * Optimized Client Component for Commerce Layer integration
 * - Handles client-side Commerce Layer initialization
 * - Uses the React Context API via Commerce Layer's components
 * - Prevents re-renders and state updates during render
 */
export default function CommerceLayerClient({ token, endpoint, children }) {
  // Track initialization to prevent infinite render loops
  const initialized = useRef(false);
  
  // Handle token persistence on client
  useEffect(() => {
    // Prevent multiple initializations - only run when props change
    if (!initialized.current && token && endpoint) {
      let isMounted = true;
      
      const initializeAuth = async () => {
        try {
          // Check if we need to save token to cookie
          const cookies = document.cookie.split(';');
          const hasTokenCookie = cookies.some(cookie => 
            cookie.trim().startsWith('cl_auth_token='));
          
          if (!hasTokenCookie) {
            // Use absolute URLs for API calls as per best practices
            // Use API route to handle cookie setting (avoids SameSite issues)
            const origin = window.location.origin;
            await fetch(`${origin}/api/cookies`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                name: 'cl_auth_token', 
                value: token,
                options: { maxAge: 3600, path: '/' }
              }),
              credentials: 'include'
            });
          }
          
          // Update ref only if component is still mounted
          if (isMounted) {
            initialized.current = true;
          }
        } catch (error) {
          console.error('Error initializing Commerce Layer auth:', error);
          // Still mark as initialized to prevent infinite retries
          if (isMounted) {
            initialized.current = true;
          }
        }
      };
      
      initializeAuth();
      
      // Cleanup function
      return () => {
        isMounted = false;
      };
    }
  }, [token, endpoint]);
  
  // Render Commerce Layer provider when token and endpoint are available
  return (
    <CommerceLayer accessToken={token} endpoint={endpoint}>
      {children}
    </CommerceLayer>
  );
}

'use client';

import React, { createContext, useContext } from 'react';
import { CommerceLayer, useCommerceLayer } from '@commercelayer/react-components';

// Context value will now be { accessToken: string | null, endpoint: string | null, sdkClient: function | null }
const RawCommerceLayerContext = createContext(null);

// Custom hook to easily access the raw context values
export const useRawCommerceLayer = () => useContext(RawCommerceLayerContext);

// Internal component that reads CL context and merges with endpoint prop
function ContextBridge({ children, endpoint }) { // Accept endpoint prop
  const clContext = useCommerceLayer(); // Access context set by <CommerceLayer>
  
  // Log what the hook returns
  console.log("[CLProvider Client] useCommerceLayer() returned:", clContext);

  // Create the value for our custom context
  const rawContextValue = {
    accessToken: clContext?.accessToken || null,
    sdkClient: clContext?.sdkClient || null,
    endpoint: endpoint || null // Include the endpoint prop
  };

  console.log("[CLProvider Client] Providing RawCommerceLayerContext with:", rawContextValue);

  // Provide these values through our custom context
  return (
    <RawCommerceLayerContext.Provider value={rawContextValue}>
      {children}
    </RawCommerceLayerContext.Provider>
  );
}

/**
 * Client Component: Wraps children with the CommerceLayer provider.
 * Receives accessToken and endpoint from its Server Component parent.
 */
export default function CommerceLayerClient({ children, accessToken, endpoint }) {
  
  // Log the props received by the client component
  console.log("[CLProvider Client] Received props:", { endpoint, hasToken: !!accessToken });

  if (!endpoint) {
    // Handle cases where token/endpoint might be missing (e.g., error upstream)
    // Optionally render an error message or a fallback UI
    console.error("[CLProvider Client] Endpoint prop is missing. Cannot initialize CommerceLayer context.");
    return <>{children}</>; 
  }

  if (!accessToken) {
    console.warn("[CLProvider Client] AccessToken prop is missing or null. Commerce Layer functionalities might be limited or fail.");
  }

  // Initialize Commerce Layer Provider with fetched token and endpoint
  // Ensure accessToken is passed correctly, even if null (library might handle it)
  return (
    <CommerceLayer accessToken={accessToken} endpoint={endpoint}> 
      {/* Bridge allows children to access context values via useRawCommerceLayer */}
      {/* Pass endpoint to the bridge */}
      <ContextBridge endpoint={endpoint}>
        {children}
      </ContextBridge>
    </CommerceLayer>
  );
}

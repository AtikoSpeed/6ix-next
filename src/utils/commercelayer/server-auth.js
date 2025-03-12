/* eslint-disable no-undef */
// This file should only be imported by server components or route handlers

import {authenticate} from '@commercelayer/js-auth'

/**
 * Get a Commerce Layer access token for the sales channel (server-side)
 * @returns {Promise<string>} The access token
 */
export async function getServerAccessToken() {
  try {
    // Ensure these environment variables are defined in your .env file
    const clientId = process.env.NEXT_PUBLIC_CL_CLIENT_ID
    const scope = process.env.NEXT_PUBLIC_CL_SCOPE
    const endpoint = process.env.NEXT_PUBLIC_CL_ENDPOINT

    if (!clientId || !scope || !endpoint) {
      throw new Error('Missing Commerce Layer credentials: clientId, scope, and endpoint are required')
    }

    console.log('Authenticating with Commerce Layer using these credentials:', {
      grant_type: 'client_credentials',
      clientId: clientId ? 'provided' : 'missing',
      scope: scope,
      endpoint: endpoint
    });

    // Clean the endpoint if needed (remove trailing slash)
    const cleanEndpoint = endpoint.replace(/\/$/, '')
    
    // Use the official JS auth library from Commerce Layer for better compatibility
    try {
      const auth = await authenticate('client_credentials', {
        clientId,
        scope,
        endpoint: cleanEndpoint
      })
      
      console.log('Successfully authenticated with Commerce Layer')
      return auth.accessToken
    } catch (authError) {
      console.error('Authentication error from Commerce Layer JS library:', authError)
      throw authError
    }
  } catch (error) {
    console.error('Error getting Commerce Layer access token:', error)
    throw error
  }
}

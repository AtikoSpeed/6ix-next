// This file should only be imported by server components or route handlers
"use server";

import {authenticate} from '@commercelayer/js-auth'
import {getCommerceLayerConfig, cleanEndpointUrl} from './config'

/**
 * Get a Commerce Layer access token for the sales channel (server-side)
 * @returns {Promise<string>} The access token
 */
export async function getServerAccessToken() {
  try {
    // Get configuration from centralized config
    const {clientId, scope, endpoint} = getCommerceLayerConfig()

    if (!clientId || !scope || !endpoint) {
      throw new Error('Missing Commerce Layer credentials: clientId, scope, and endpoint are required')
    }

    // Use the official JS auth library from Commerce Layer for better compatibility
    try {
      // Clean the endpoint (remove trailing slash)
      const cleanEndpoint = cleanEndpointUrl(endpoint)
      
      const auth = await authenticate('client_credentials', {
        clientId,
        scope,
        endpoint: cleanEndpoint
      })
      
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

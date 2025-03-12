/* eslint-disable no-undef */
// This file should only be imported by server components or route handlers

import { getSalesChannelToken } from '@commercelayer/js-auth'

/**
 * Get a Commerce Layer access token for the sales channel (server-side)
 * @returns {Promise<string>} The access token
 */
export async function getServerAccessToken() {
  try {
    // Ensure these environment variables are defined in your .env file
    const clientId = process.env.NEXT_PUBLIC_CL_CLIENT_ID
    const endpoint = process.env.NEXT_PUBLIC_CL_ENDPOINT
    const scope = process.env.NEXT_PUBLIC_CL_SCOPE

    if (!clientId || !endpoint || !scope) {
      throw new Error('Missing Commerce Layer credentials')
    }

    const token = await getSalesChannelToken({
      clientId,
      endpoint,
      scope
    })

    return token.accessToken
  } catch (error) {
    console.error('Error getting Commerce Layer access token:', error)
    throw error
  }
}

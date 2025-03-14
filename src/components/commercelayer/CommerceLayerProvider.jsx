"use server";

import CommerceLayerServerWrapper from './CommerceLayerServerWrapper';

/**
 * Server component that wraps Commerce Layer functionality
 * This ensures token fetching happens on the server
 */
export default async function CLProvider({ children }) {
  return <CommerceLayerServerWrapper>{children}</CommerceLayerServerWrapper>;
}

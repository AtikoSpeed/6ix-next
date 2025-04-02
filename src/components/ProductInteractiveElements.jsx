'use client';

import React, { useState, useEffect, Suspense, useMemo } from 'react';
import { 
  Price, 
  Skus 
} from '@commercelayer/react-components';
import { useRawCommerceLayer } from './commercelayer/CommerceLayerClient'; 

export default function ProductInteractiveElements({ variants, description }) {
  
  const { accessToken, endpoint } = useRawCommerceLayer() || {}; 
  
  const initialSku = variants?.[0]?.code || null;
  const [selectedSku, setSelectedSku] = useState(initialSku);
  const [availabilityData, setAvailabilityData] = useState({}); 
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);
  const [availabilityError, setAvailabilityError] = useState(null);

  const handleSizeChange = (event) => {
    setSelectedSku(event.target.value);
  };

  // Memoize allSkus to prevent unnecessary recalculations
  const allSkus = useMemo(() => {
    return variants?.map(v => v.code).filter(Boolean) || [];
  }, [variants]); 
 
  useEffect(() => {
    if (allSkus.length === 0 || !accessToken || !endpoint) {
      console.log("Skipping availability fetch: missing skus, token, or endpoint", { hasSkus: allSkus.length > 0, hasToken: !!accessToken, hasEndpoint: !!endpoint});
      if (allSkus.length > 0 && (!accessToken || !endpoint)) {
         setAvailabilityError("Cannot check stock: CL configuration missing.");
      }
      return; 
    }

    const fetchAvailability = async () => {
      setIsLoadingAvailability(true);
      setAvailabilityError(null);
      console.log("Fetching availability for SKUs:", allSkus);

      const apiUrl = `${endpoint}/api/skus?filter[q][code_in]=${allSkus.join(',')}&fields[skus]=code&include=stock_items&fields[stock_items]=quantity`;

      try {
        const response = await fetch(apiUrl, {
          headers: {
            'Accept': 'application/vnd.api+json',
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Raw Availability API Response:", data);

        const includedStockItems = data.included || [];
        const newAvailability = {};

        data.data.forEach(sku => {
            const relatedStockItemRefs = sku.relationships?.stock_items?.data || [];
            let totalQuantity = 0;
            relatedStockItemRefs.forEach(ref => {
                const stockItem = includedStockItems.find(item => item.type === ref.type && item.id === ref.id);
                if (stockItem) {
                  totalQuantity += stockItem.attributes.quantity;
                }
            });
            newAvailability[sku.attributes.code] = { quantity: totalQuantity }; 
        });

        console.log("Processed Availability Data:", newAvailability);
        setAvailabilityData(newAvailability);

        if (!selectedSku) {
            const firstAvailable = variants?.find(v => newAvailability[v.code]?.quantity > 0);
            if (firstAvailable) {
              console.log("Setting initial available SKU (manual fetch):", firstAvailable.code);
              setSelectedSku(firstAvailable.code);
            }
          }

      } catch (error) {
        console.error("Error fetching availability:", error);
        setAvailabilityError(`Failed to load stock levels: ${error.message}`);
        setAvailabilityData({}); 
      } finally {
        setIsLoadingAvailability(false);
      }
    };

    fetchAvailability();

  }, [allSkus, accessToken, endpoint]); 

  return (
    <div>
      <Suspense fallback={<div className="text-2xl font-semibold mb-4">Loading price...</div>}>
        {selectedSku ? (
          <Skus codes={[selectedSku]}>
            <Price className="text-2xl font-semibold mb-4" />
          </Skus>
        ) : (
          <div className="text-2xl font-semibold mb-4">Select size for price</div>
        )}
      </Suspense>

      <p className="text-gray-600 mb-6">{description}</p>

      {variants && variants.length > 0 && (
        <div className="mb-6">
          <label htmlFor="size-select" className="block text-sm font-medium text-gray-700 mb-1">
            Size:
          </label>
          <select
            id="size-select"
            value={selectedSku || ''} 
            onChange={handleSizeChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            disabled={allSkus.length === 0 || isLoadingAvailability} 
          >
            <option value="" disabled={!!selectedSku}>Select a size</option>
            {variants.map((variant) => {
              const skuCode = variant.code;
              let displayName = variant.size?.name || 'N/A';
              let isAvailable = false; // Default to not available
 
              if (isLoadingAvailability) { 
                displayName += ' (Checking...)';
                // isAvailable remains false, option disabled
              } else if (availabilityError) { 
                displayName += ' (Stock check failed)';
                // isAvailable remains false, option disabled
              } else {
                // Check availability only if not loading and no error
                if (Object.prototype.hasOwnProperty.call(availabilityData, skuCode)) {
                  // Key exists, check quantity
                  isAvailable = availabilityData[skuCode]?.quantity > 0;
                } 
                // If key doesn't exist OR quantity <= 0, isAvailable remains false.
                
                if (!isAvailable) {
                  displayName += ' (Out of Stock)';
                }
                // If isAvailable is true, no suffix is added (In Stock)
              }
 
              return (
                <option key={variant._id || skuCode} value={skuCode} disabled={isLoadingAvailability || availabilityError || !isAvailable}>
                  {displayName}
                </option>
              );
            })}
          </select>
          {availabilityError && <p className="text-sm text-red-500 mt-1">{availabilityError}</p>}
        </div>
      )}

      <button 
        disabled={isLoadingAvailability || !selectedSku || !(availabilityData[selectedSku]?.quantity > 0)}
        className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {isLoadingAvailability ? 'Checking Stock...' : 'Add to Cart (Placeholder)'}
      </button>
      {!isLoadingAvailability && !selectedSku && <p className="text-sm text-red-500 mt-2">Please select a size.</p>} 
      {!isLoadingAvailability && selectedSku && !(availabilityData[selectedSku]?.quantity > 0) && <p className="text-sm text-red-500 mt-2">This size is out of stock.</p>}

    </div>
  );
}

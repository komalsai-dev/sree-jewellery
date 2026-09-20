/**
 * Express Delivery Calculation Utility for Sree Jewellery
 * Calculates estimated delivery time, serviceability, and transit details based on Indian PIN codes.
 */

export interface DeliveryEstimateResult {
  valid: boolean;
  pincode: string;
  locationName: string;
  minDays: number;
  maxDays: number;
  deliveryDateFormatted: string;
  isExpressAvailable: boolean;
  serviceType: string;
  notes: string;
}

// Indian postal zone detection from the first 2 digits of the pincode
function getLocationFromPincode(pin: string): { location: string; minDays: number; maxDays: number; isExpress: boolean } {
  const prefix2 = parseInt(pin.substring(0, 2), 10);
  const prefix3 = parseInt(pin.substring(0, 3), 10);

  // Andhra Pradesh & Telangana (Origin & Local Hubs)
  if (prefix2 >= 50 && prefix2 <= 53) {
    if (prefix3 >= 500 && prefix3 <= 509) return { location: 'Hyderabad / Telangana Region', minDays: 1, maxDays: 2, isExpress: true };
    if (prefix3 >= 520 && prefix3 <= 524) return { location: 'Vijayawada / Guntur / AP Central', minDays: 1, maxDays: 2, isExpress: true };
    if (prefix3 >= 530 && prefix3 <= 535) return { location: 'Visakhapatnam / North Coastal AP', minDays: 1, maxDays: 2, isExpress: true };
    if (prefix3 >= 515 && prefix3 <= 518) return { location: 'Rayalaseema Region (AP)', minDays: 2, maxDays: 3, isExpress: true };
    return { location: 'Andhra Pradesh & Telangana', minDays: 1, maxDays: 2, isExpress: true };
  }

  // Karnataka
  if (prefix2 >= 56 && prefix2 <= 59) {
    if (prefix3 >= 560 && prefix3 <= 562) return { location: 'Bengaluru Metro (Karnataka)', minDays: 2, maxDays: 3, isExpress: true };
    return { location: 'Karnataka State', minDays: 2, maxDays: 3, isExpress: true };
  }

  // Tamil Nadu & Puducherry
  if (prefix2 >= 60 && prefix2 <= 64) {
    if (prefix3 >= 600 && prefix3 <= 603) return { location: 'Chennai Metro (Tamil Nadu)', minDays: 2, maxDays: 3, isExpress: true };
    if (prefix3 >= 641 && prefix3 <= 643) return { location: 'Coimbatore Region', minDays: 2, maxDays: 3, isExpress: true };
    return { location: 'Tamil Nadu & Puducherry', minDays: 2, maxDays: 3, isExpress: true };
  }

  // Kerala
  if (prefix2 >= 67 && prefix2 <= 69) {
    if (prefix3 >= 682 && prefix3 <= 685) return { location: 'Kochi / Ernakulam (Kerala)', minDays: 2, maxDays: 3, isExpress: true };
    return { location: 'Kerala State', minDays: 2, maxDays: 4, isExpress: true };
  }

  // Maharashtra & Goa
  if (prefix2 >= 40 && prefix2 <= 44) {
    if (prefix3 >= 400 && prefix3 <= 402) return { location: 'Mumbai & MMR Region', minDays: 2, maxDays: 3, isExpress: true };
    if (prefix3 >= 411 && prefix3 <= 413) return { location: 'Pune Region', minDays: 2, maxDays: 3, isExpress: true };
    return { location: 'Maharashtra & Goa', minDays: 3, maxDays: 4, isExpress: true };
  }

  // Gujarat
  if (prefix2 >= 36 && prefix2 <= 39) {
    if (prefix3 >= 380 && prefix3 <= 382) return { location: 'Ahmedabad (Gujarat)', minDays: 2, maxDays: 3, isExpress: true };
    return { location: 'Gujarat State', minDays: 3, maxDays: 4, isExpress: true };
  }

  // Delhi NCR, Haryana, Punjab
  if (prefix2 === 11) return { location: 'Delhi NCR Metro', minDays: 2, maxDays: 3, isExpress: true };
  if (prefix2 >= 12 && prefix2 <= 13) return { location: 'Haryana / NCR Region', minDays: 3, maxDays: 4, isExpress: true };
  if (prefix2 >= 14 && prefix2 <= 16) return { location: 'Punjab & Chandigarh', minDays: 3, maxDays: 4, isExpress: true };

  // Rajasthan
  if (prefix2 >= 30 && prefix2 <= 34) return { location: 'Rajasthan (Jaipur / Jodhpur Hubs)', minDays: 3, maxDays: 4, isExpress: true };

  // Uttar Pradesh & Uttarakhand
  if (prefix2 >= 20 && prefix2 <= 28) return { location: 'Uttar Pradesh & Uttarakhand', minDays: 3, maxDays: 5, isExpress: true };

  // West Bengal, Odisha, Bihar, Jharkhand
  if (prefix2 >= 70 && prefix2 <= 74) return { location: 'Kolkata & West Bengal', minDays: 3, maxDays: 4, isExpress: true };
  if (prefix2 >= 75 && prefix2 <= 77) return { location: 'Odisha State', minDays: 3, maxDays: 4, isExpress: true };
  if (prefix2 >= 80 && prefix2 <= 85) return { location: 'Bihar & Jharkhand', minDays: 3, maxDays: 5, isExpress: true };

  // Madhya Pradesh & Chhattisgarh
  if (prefix2 >= 45 && prefix2 <= 49) return { location: 'Madhya Pradesh & Chhattisgarh', minDays: 3, maxDays: 5, isExpress: true };

  // North-East States
  if (prefix2 >= 78 && prefix2 <= 79) return { location: 'Assam & North-East Region', minDays: 4, maxDays: 6, isExpress: true };

  // Jammu & Kashmir, Ladakh, Himachal Pradesh
  if (prefix2 >= 17 && prefix2 <= 19) return { location: 'Himachal & J&K Region', minDays: 4, maxDays: 6, isExpress: false };

  // Default Pan-India
  return { location: 'India (Standard Postal Zone)', minDays: 3, maxDays: 5, isExpress: true };
}

/**
 * Calculates estimated delivery date considering business days (excluding Sunday)
 */
function calculateDeliveryDate(daysToAdd: number): string {
  const date = new Date();
  let added = 0;

  while (added < daysToAdd) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    // Skip Sunday (0) for courier business delivery calculation
    if (day !== 0) {
      added++;
    }
  }

  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Main estimate delivery function
 */
export function estimateDelivery(pincodeInput: string): DeliveryEstimateResult {
  const cleaned = pincodeInput.replace(/\D/g, '').trim();

  if (cleaned.length !== 6) {
    return {
      valid: false,
      pincode: cleaned,
      locationName: '',
      minDays: 0,
      maxDays: 0,
      deliveryDateFormatted: '',
      isExpressAvailable: false,
      serviceType: 'Invalid Pincode',
      notes: 'Please enter a valid 6-digit Indian PIN code.'
    };
  }

  const { location, minDays, maxDays, isExpress } = getLocationFromPincode(cleaned);
  const earliestDate = calculateDeliveryDate(minDays);
  const latestDate = calculateDeliveryDate(maxDays);

  const deliveryDateFormatted = minDays === maxDays 
    ? earliestDate 
    : `${earliestDate} – ${latestDate}`;

  return {
    valid: true,
    pincode: cleaned,
    locationName: location,
    minDays,
    maxDays,
    deliveryDateFormatted,
    isExpressAvailable: isExpress,
    serviceType: isExpress ? 'Insured Priority Air Express' : 'Insured Ground Express',
    notes: `Complimentary Insured Express Delivery to ${location} with real-time tracking in signature velvet keepsake box.`
  };
}

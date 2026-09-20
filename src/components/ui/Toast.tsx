'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

export default function Toast() {
  const { toastMessage } = useCart();

  return (
    <div 
      id="toast" 
      role="status" 
      aria-live="polite"
      className={toastMessage ? 'visible' : ''}
    >
      {toastMessage}
    </div>
  );
}

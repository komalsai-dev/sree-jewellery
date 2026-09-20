'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '@/types';
import { useProducts } from '@/context/ProductContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string, size: string, quantity: number) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  totalItems: number;
  subtotal: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  totalWishlist: number;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { getProductById } = useProducts();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sree-3d-bag');
      if (stored) {
        setCart(JSON.parse(stored));
      }
      const storedWish = localStorage.getItem('sree-3d-wishlist');
      if (storedWish) {
        setWishlist(JSON.parse(storedWish));
      }
    } catch {
      // localStorage not available
    }
  }, []);

  const persistCart = (updated: CartItem[]) => {
    setCart(updated);
    try {
      localStorage.setItem('sree-3d-bag', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const persistWishlist = (updated: string[]) => {
    setWishlist(updated);
    try {
      localStorage.setItem('sree-3d-wishlist', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3200);
  };

  const toggleWishlist = (productId: string) => {
    const isSaved = wishlist.includes(productId);
    const updated = isSaved 
      ? wishlist.filter(id => id !== productId) 
      : [...wishlist, productId];
    persistWishlist(updated);
    const prod = getProductById(productId);
    showToast(isSaved 
      ? `${prod ? prod.name : 'Piece'} removed from your wishlist.` 
      : `${prod ? prod.name : 'Piece'} saved to your wishlist.`);
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const addToCart = (productId: string, size: string, quantity: number) => {
    const existingIdx = cart.findIndex(item => item.id === productId && item.size === size);
    let updated: CartItem[];
    if (existingIdx > -1) {
      updated = [...cart];
      updated[existingIdx].quantity = Math.min(99, updated[existingIdx].quantity + quantity);
    } else {
      updated = [...cart, { id: productId, size, quantity }];
    }
    persistCart(updated);
    const prod = getProductById(productId);
    showToast(`${prod ? prod.name : 'Piece'} added to your jewellery box.`);
  };

  const removeFromCart = (index: number) => {
    const updated = cart.filter((_, i) => i !== index);
    persistCart(updated);
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    const updated = [...cart];
    updated[index].quantity = Math.min(99, quantity);
    persistCart(updated);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlist = wishlist.length;
  
  const subtotal = cart.reduce((sum, item) => {
    const prod = getProductById(item.id);
    return sum + (prod ? prod.price * item.quantity : 0);
  }, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      totalItems,
      subtotal,
      wishlist,
      toggleWishlist,
      isWishlisted,
      totalWishlist,
      toastMessage,
      showToast
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useModals } from '@/context/ModalContext';
import { useCart } from '@/context/CartContext';

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView } = useModals();
  const { addToCart } = useCart();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [size, setSize] = useState('US 7');
  const [quantity, setQuantity] = useState(1);

  const sizes = quickViewProduct?.category === 'Rings'
    ? ['US 4', 'US 5', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10']
    : ['Necklaces', 'Chains'].includes(quickViewProduct?.category || '')
      ? ['16 in', '18 in', '20 in']
      : ['One size'];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (quickViewProduct) {
      setSize(sizes.includes('US 7') ? 'US 7' : sizes[0]);
      setQuantity(1);
      dialog.showModal();
      document.body.classList.add('modal-open');
    } else {
      dialog.close();
      document.body.classList.remove('modal-open');
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return (
    <dialog id="product-dialog" aria-labelledby="product-dialog-title" ref={dialogRef}></dialog>
  );

  const imageUrl = quickViewProduct.image || `/assets/img/p-${quickViewProduct.id}.png`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToCart(quickViewProduct.id, size, quantity);
    closeQuickView();
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(quickViewProduct.price);

  return (
    <dialog
      ref={dialogRef}
      id="product-dialog"
      aria-labelledby="product-dialog-title"
      onClose={closeQuickView}
      onClick={(e) => {
        if (e.target === dialogRef.current) closeQuickView();
      }}
    >
      <div className="dialog-header">
        <h2 id="product-dialog-title">{quickViewProduct.name}</h2>
        <button 
          type="button" 
          className="icon-button" 
          data-close-dialog 
          aria-label="Close product details"
          onClick={closeQuickView}
        >
          <svg className="icon"><use href="#icon-close"></use></svg>
        </button>
      </div>
      <div className="product-dialog-layout">
        <div className="dialog-product-image">
          <img 
            id="dialog-product-image" 
            src={imageUrl} 
            alt={quickViewProduct.name} 
            width={500} 
            height={600} 
          />
        </div>
        <form className="product-dialog-copy" id="product-options-form" onSubmit={handleSubmit}>
          <p className="eyebrow" id="dialog-product-material">{quickViewProduct.material.toUpperCase()}</p>
          <p id="dialog-product-description">
            {quickViewProduct.description || "A considered silhouette with an extraordinary eye for detail. Designed to be styled your way, every day."}
          </p>
          <p id="dialog-product-price" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--espresso)', fontFamily: 'var(--serif)' }}>
            {formattedPrice}
            {quickViewProduct.oldPrice && (
              <s style={{ fontSize: '13px', color: 'rgba(36,26,22,0.45)', marginLeft: '8px', fontWeight: 400, fontFamily: 'var(--sans)' }}>
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(quickViewProduct.oldPrice)}
              </s>
            )}
          </p>
          
          <label className="field-label" htmlFor="product-size" id="product-size-label">
            {['Necklaces', 'Chains'].includes(quickViewProduct.category) ? 'Length' : 'Size'}
          </label>
          <select 
            id="product-size" 
            name="size" 
            required
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            {sizes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <label className="field-label" htmlFor="product-quantity">Quantity</label>
          <input 
            id="product-quantity" 
            name="quantity" 
            type="number" 
            min="1" 
            max="10" 
            step="1" 
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            required 
          />

          <button className="button" type="submit">
            Add to Jewellery Box 
            <svg className="icon"><use href="#icon-bag"></use></svg>
          </button>
        </form>
      </div>
    </dialog>
  );
}

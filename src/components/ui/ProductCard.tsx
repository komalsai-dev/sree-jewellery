'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useModals } from '@/context/ModalContext';
import { getProductWhatsAppUrl } from '@/utils/whatsapp';

interface ProductCardProps {
  product: Product;
  isNew?: boolean;
}

export default function ProductCard({ product, isNew = false }: ProductCardProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const { openCart } = useModals();
  const wishlisted = isWishlisted(product.id);

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.price);

  const formattedOldPrice = product.oldPrice 
    ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.oldPrice)
    : null;

  const defaultBadge = product.badge || (isNew ? "NEW ARRIVAL" : null);
  const defaultSize = product.sizes ? product.sizes[0] : "Standard";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, defaultSize, 1);
    openCart();
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = getProductWhatsAppUrl({
      id: product.id,
      name: product.name,
      price: product.price,
      material: product.material,
      sku: product.sku,
      size: defaultSize
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <article className="pcard" data-product-card={product.id}>
      {/* Product Media Card with Hover Slide Actions */}
      <div className="pcard__media">
        <Link href={`/product/${product.id}`} className="pcard__image-link" aria-label={product.name}>
          <img 
            src={product.image || `/assets/img/p-${product.id}.png`} 
            alt={`${product.name} — ${product.material}`}
            loading="lazy"
            width={400}
            height={480}
          />
        </Link>

        {/* Top-Left Bestseller / New Badge */}
        {defaultBadge && (
          <span className="pcard__badge">
            {defaultBadge}
          </span>
        )}

        {/* Top-Right Heart Wishlist Button */}
        <button 
          type="button" 
          className={`pcard__wish ${wishlisted ? 'is-on' : ''}`}
          onClick={handleToggleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
        >
          <svg viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.3">
            <path d="M12 20.5C7 16.5 3.5 13.3 3.5 9.6 3.5 7 5.5 5 8 5c1.6 0 3.1.8 4 2.1C12.9 5.8 14.4 5 16 5c2.5 0 4.5 2 4.5 4.6 0 3.7-3.5 6.9-8.5 10.9Z" />
          </svg>
        </button>

        {/* Smooth Slide-Up Actions on Card Hover */}
        <div className="pcard__actions">
          <button 
            type="button" 
            className="pcard__action-btn pcard__buy-btn"
            onClick={handleBuyNow}
            aria-label={`Buy ${product.name} on WhatsApp`}
            title="Order instantly on WhatsApp"
          >
            Buy Now
          </button>
          <button 
            type="button" 
            className="pcard__action-btn pcard__add-btn"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to bag`}
          >
            Add to Bag
          </button>
        </div>
      </div>

      {/* Product Details Below Media */}
      <div className="pcard__body">
        <span className="pcard__kicker">{product.material.toUpperCase()}</span>
        <h3 className="pcard__name">
          <Link href={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        <p className="pcard__price">
          {formattedPrice}
          {formattedOldPrice && <s>{formattedOldPrice}</s>}
        </p>
      </div>
    </article>
  );
}

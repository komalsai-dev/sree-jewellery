'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useModals } from '@/context/ModalContext';
import { useProducts } from '@/context/ProductContext';
import { getCartWhatsAppUrl, DISPLAY_PHONE } from '@/utils/whatsapp';

export default function CartDrawerModal() {
  const { isCartOpen, closeCart } = useModals();
  const { cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
  const { getProductById } = useProducts();
  const drawerRef = useRef<HTMLDivElement | null>(null);

  // Close drawer on Escape key or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };

    if (isCartOpen) {
      document.body.classList.add('modal-open');
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [isCartOpen, closeCart]);

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);

  const whatsappCheckoutUrl = getCartWhatsAppUrl(cart, getProductById, subtotal);

  return (
    <>
      {/* Dimmed Blurred Scrim Overlay */}
      <div 
        className={`drawer-scrim ${isCartOpen ? 'is-open' : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Right Slide-Out Luxury Drawer */}
      <aside 
        ref={drawerRef}
        className={`cart-drawer-panel ${isCartOpen ? 'is-open' : ''}`}
        aria-label="Shopping Bag Drawer"
        aria-hidden={!isCartOpen}
      >
        {/* Drawer Header */}
        <div className="drawer__head">
          <div className="drawer__title-group">
            <h2>Your Jewellery Box</h2>
            {totalItems > 0 && <span className="drawer__count-badge">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>}
          </div>
          <button 
            type="button" 
            className="drawer__close-btn" 
            onClick={closeCart}
            aria-label="Close jewellery box"
          >
            <svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
          </button>
        </div>

        {/* Drawer Body Items */}
        <div className="drawer__body">
          {cart.length === 0 ? (
            <div className="drawer__empty">
              <div className="drawer__empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <p className="drawer__empty-title">Your jewellery box is currently empty.</p>
              <p className="drawer__empty-desc">Discover our handcrafted 22K gold &amp; 925 sterling silver heirlooms.</p>
              <button 
                type="button" 
                className="drawer__shop-btn"
                onClick={closeCart}
              >
                Explore Collections
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item, idx) => {
                const product = getProductById(item.id);
                if (!product) return null;

                const itemImg = product.image || `/assets/img/p-${product.id}.png`;
                const itemLineTotal = product.price * item.quantity;

                return (
                  <div key={`${item.id}-${item.size}-${idx}`} className="cline">
                    {/* Thumbnail Image */}
                    <Link 
                      href={`/product/${product.id}`} 
                      className="cline__img-wrap"
                      onClick={closeCart}
                    >
                      <img 
                        src={itemImg} 
                        alt={product.name} 
                        loading="lazy" 
                      />
                    </Link>

                    {/* Info & Quantity */}
                    <div className="cline__info">
                      <div className="cline__header">
                        <Link 
                          href={`/product/${product.id}`} 
                          className="cline__name"
                          onClick={closeCart}
                        >
                          {product.name}
                        </Link>
                        <button 
                          type="button" 
                          className="cline__rm"
                          onClick={() => removeFromCart(idx)}
                          aria-label={`Remove ${product.name} from bag`}
                        >
                          <svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                        </button>
                      </div>

                      <div className="cline__meta">
                        <span>{product.material.toUpperCase()}</span>
                        {item.size && <span className="cline__size-tag">· {item.size}</span>}
                      </div>

                      <div className="cline__row">
                        {/* Stepper buttons */}
                        <div className="qty-stepper" role="group" aria-label="Quantity selector">
                          <button 
                            type="button"
                            onClick={() => updateQuantity(idx, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span aria-live="polite">{item.quantity}</span>
                          <button 
                            type="button"
                            onClick={() => updateQuantity(idx, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <span className="cline__price">{formatINR(itemLineTotal)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer (Only when items exist) */}
        {cart.length > 0 && (
          <div className="drawer__foot">
            <div className="drawer__trust-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Complimentary Insured Delivery Across India · BIS 916 / 925 Hallmark</span>
            </div>

            <div className="drawer__total">
              <span>Estimated Subtotal</span>
              <strong>{formatINR(subtotal)}</strong>
            </div>

            {/* Direct WhatsApp Order Button */}
            <a 
              href={whatsappCheckoutUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="drawer__whatsapp-btn"
              id="cart-whatsapp-order-btn"
            >
              <svg className="wa-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Order via WhatsApp</span>
            </a>

            <button 
              type="button" 
              className="drawer__continue-btn"
              onClick={closeCart}
            >
              Continue Exploring Collection
            </button>

            <p className="drawer__footer-note">
              Direct assistance available at <strong>{DISPLAY_PHONE}</strong>
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

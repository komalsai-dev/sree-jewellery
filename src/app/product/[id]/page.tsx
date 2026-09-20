'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useModals } from '@/context/ModalContext';
import { useProducts } from '@/context/ProductContext';
import { getProductWhatsAppUrl } from '@/utils/whatsapp';
import { estimateDelivery, DeliveryEstimateResult } from '@/utils/delivery';
import ProductCard from '@/ui/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = (params?.id as string || '').toLowerCase();
  const { products, getProductById } = useProducts();

  // Find product by id with live Sanity product data
  const product = getProductById(productId) || products[0];
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const { openCart, openSizeGuide } = useModals();
  const wishlisted = isWishlisted(product.id);

  // State
  const [selectedMetal, setSelectedMetal] = useState<'gold' | 'silver'>(product.metal || 'gold');
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : "Standard");
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<DeliveryEstimateResult | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const images = useMemo(() => {
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    return [product.image || `/assets/img/p-${product.id}.png`];
  }, [product]);

  // Smooth Auto-Swipe Effect (Cycles every 4 seconds, pauses on hover or user interaction)
  useEffect(() => {
    if (isHovered || images.length <= 1) return;
    const interval = setInterval(() => {
      setSelectedImageIdx((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  // Touch Swipe handlers for mobile smooth gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 45) {
      // Swiped left -> next image
      nextImage();
    } else if (diff < -45) {
      // Swiped right -> prev image
      prevImage();
    }
    setTouchStart(null);
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(product.price);

  const formattedOldPrice = product.oldPrice
    ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.oldPrice)
    : null;

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode) return;
    const result = estimateDelivery(pincode);
    setDeliveryResult(result);
  };

  const handleAddToCart = () => {
    addToCart(product.id, selectedSize, quantity);
    openCart();
  };

  // Related products from same category or metal
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .concat(products.filter(p => p.id !== product.id && p.category !== product.category && p.metal === product.metal))
    .slice(0, 4);

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 14px)', minHeight: '100vh', background: 'var(--ivory)' }}>
      <div className="wrap">
        
        {/* Breadcrumb Navigation */}
        <nav className="crumbs" style={{ paddingTop: '16px', paddingBottom: '16px' }} aria-label="Breadcrumb">
          <Link href="/" className="hover:underline">Home</Link>
          <span style={{ margin: '0 8px', opacity: 0.5 }}>/</span>
          <Link href={`/${product.category.toLowerCase()}`} className="hover:underline">{product.category}</Link>
          <span style={{ margin: '0 8px', opacity: 0.5 }}>/</span>
          <span style={{ color: 'var(--emerald)', fontWeight: 600 }}>{product.name}</span>
        </nav>

        {/* Product Detail Layout */}
        <div className="pdp">
          
          {/* Stage / Gallery Column */}
          <div className="pdp__stage">
            <div 
              className="pdp-gallery-outer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Left Navigation Arrow (Outside) */}
              {images.length > 1 && (
                <button 
                  type="button" 
                  className="pdp-nav-arrow prev" 
                  onClick={prevImage}
                  aria-label="Previous product image"
                >
                  <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
              )}

              {/* Main Image Viewport with Horizontal Slider Track */}
              <div 
                className="pdp__canvas-wrap"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div 
                  className="pdp-slider-track"
                  style={{
                    transform: `translateX(-${selectedImageIdx * 100}%)`,
                    transition: 'transform 0.62s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  {images.map((img, idx) => (
                    <div className="pdp-slide-item" key={idx}>
                      <img 
                        src={img} 
                        alt={`${product.name} — View ${idx + 1}`}
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>

                {/* Floating Image Counter Badge */}
                <span className="pdp-img-counter">
                  {selectedImageIdx + 1} / {images.length}
                </span>

                <span className="pdp__hint">Handcrafted Karigari · Verified 925 Purity</span>
              </div>

              {/* Right Navigation Arrow (Outside) */}
              {images.length > 1 && (
                <button 
                  type="button" 
                  className="pdp-nav-arrow next" 
                  onClick={nextImage}
                  aria-label="Next product image"
                >
                  <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              )}
            </div>

            {/* Thumbnail Selection Strip */}
            {images.length > 1 && (
              <div className="pdp-thumbnails-strip" aria-label="Product image thumbnails">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`pdp-thumb-item ${selectedImageIdx === idx ? 'is-active' : ''}`}
                    onClick={() => setSelectedImageIdx(idx)}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}

            {/* Plating / Finish Selector */}
            <div className="pdp__finish-selector">
              <span className="pdp__finish-label">SELECT FINISH &amp; POLISH:</span>
              <div className="pdp__metal" role="group" aria-label="Select jewellery plating finish">
                <button 
                  type="button"
                  className={`metal-btn ${selectedMetal === 'gold' ? 'is-active' : ''}`}
                  data-metal="gold"
                  onClick={() => setSelectedMetal('gold')}
                >
                  <i></i>
                  <span>18K Gold Plated <small style={{ display: 'block', fontSize: '9px', textTransform: 'none', opacity: 0.8 }}>925 Silver Base</small></span>
                </button>
                <button 
                  type="button"
                  className={`metal-btn ${selectedMetal === 'silver' ? 'is-active' : ''}`}
                  data-metal="silver"
                  onClick={() => setSelectedMetal('silver')}
                >
                  <i></i>
                  <span>Pure 925 Silver <small style={{ display: 'block', fontSize: '9px', textTransform: 'none', opacity: 0.8 }}>Rhodium Lustre</small></span>
                </button>
              </div>
              <p style={{ fontSize: '11px', color: 'rgba(36, 26, 22, 0.65)', marginTop: '8px', lineHeight: 1.45, textAlign: 'center' }}>
                ✦ <strong>Purity Guarantee:</strong> Solid 925 Sterling Silver base with BIS Hallmark Certificate.
              </p>
            </div>
          </div>

          {/* Product Information Column */}
          <div className="pdp__info">
            <span className="pcard__kicker" style={{ fontSize: '11px', letterSpacing: '0.22em' }}>
              {product.material.toUpperCase()} · {product.category.toUpperCase()}
            </span>
            <h1>{product.name}</h1>
            
            <p className="pdp__rating">
              ★★★★★ <span>5.0 · Atelier Certified Karigari</span>
            </p>
            
            <p className="pdp__price">
              {formattedPrice}
              {formattedOldPrice && <s>{formattedOldPrice}</s>}
            </p>
            <p className="pdp__tax">Inclusive of all taxes · BIS hallmark included</p>

            <p className="pdp__desc">
              {product.description || "An extraordinary silhouette sculpted with an eye for subtle proportion and luminous light refraction. Handcrafted by heritage karigars with lifelong artisanal mastery."}
            </p>

            {/* Size Selector & Size Chart */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginTop: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--espresso)', margin: 0 }}>
                    {['Necklaces', 'Chains'].includes(product.category) ? 'Select Length' : 'Select Size (Indian Standard)'}
                  </label>
                  <button
                    type="button"
                    onClick={openSizeGuide}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--emerald)',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '2px 4px'
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12h20M2 12v4M22 12v4M6 12v2M10 12v3M14 12v2M18 12v3M2 8h20" />
                    </svg>
                    Size Guide &amp; Measurements
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      style={{
                        padding: '9px 16px',
                        fontSize: '11.5px',
                        borderRadius: '4px',
                        border: selectedSize === s ? '1.5px solid var(--emerald)' : '1px solid var(--sage)',
                        background: selectedSize === s ? 'var(--emerald)' : '#ffffff',
                        color: selectedSize === s ? 'var(--ivory)' : 'var(--espresso)',
                        cursor: 'pointer',
                        fontWeight: selectedSize === s ? 700 : 500,
                        transition: 'all 0.2s',
                        boxShadow: selectedSize === s ? '0 3px 10px rgba(18, 59, 50, 0.2)' : 'none'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pdp__acts">
              <button 
                type="button" 
                className="button" 
                onClick={handleAddToCart}
                style={{ flex: 1, minWidth: '200px' }}
              >
                Add to Bag
              </button>
              <button 
                type="button" 
                className="button secondary" 
                onClick={() => toggleWishlist(product.id)}
                style={{ flex: 1, minWidth: '180px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill={wishlisted ? "#b03a2e" : "none"} stroke={wishlisted ? "#b03a2e" : "currentColor"} strokeWidth="1.5">
                  <path d="M12 20.5C7 16.5 3.5 13.3 3.5 9.6 3.5 7 5.5 5 8 5c1.6 0 3.1.8 4 2.1C12.9 5.8 14.4 5 16 5c2.5 0 4.5 2 4.5 4.6 0 3.7-3.5 6.9-8.5 10.9Z" />
                </svg>
                {wishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
              </button>
            </div>

            {/* WhatsApp Direct Order / Price Quote */}
            <a
              href={getProductWhatsAppUrl({
                id: product.id,
                name: product.name,
                price: product.price,
                material: product.material,
                sku: product.sku,
                size: selectedSize
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="pdp-whatsapp-btn"
              style={{ width: '100%', marginBottom: '24px' }}
            >
              <svg className="wa-icon" viewBox="0 0 24 24" fill="currentColor" style={{ width: '18px', height: '18px', marginRight: '8px' }}>
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Instant Price Quote &amp; Order on WhatsApp</span>
            </a>

            {/* Express Delivery & Pincode Checker */}
            <div style={{
              padding: '18px 20px',
              border: '1px solid rgba(201, 161, 90, 0.35)',
              borderRadius: '12px',
              background: '#fcfaf6',
              boxShadow: '0 4px 16px rgba(26, 20, 14, 0.03)',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, color: '#123b32', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                  Estimated Delivery &amp; Pincode Check
                </span>
                <span style={{
                  fontSize: '9.5px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  background: 'rgba(201, 161, 90, 0.15)',
                  color: '#1a140e',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: '1px solid rgba(201, 161, 90, 0.3)'
                }}>
                  Insured Transit
                </span>
              </div>

              <form onSubmit={handleCheckPincode} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Enter 6-digit Pincode (e.g. 500081, 520001)"
                  value={pincode}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setPincode(val);
                  }}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    border: '1px solid rgba(201, 161, 90, 0.4)',
                    borderRadius: '6px',
                    background: '#ffffff',
                    fontSize: '12.5px',
                    color: '#1a140e',
                    outline: 'none'
                  }}
                  maxLength={6}
                />
                <button
                  type="submit"
                  className="button secondary"
                  style={{
                    minHeight: '40px',
                    padding: '0 20px',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    fontWeight: 700,
                    borderRadius: '6px'
                  }}
                >
                  Check
                </button>
              </form>

              {/* Delivery Estimation Result */}
              {deliveryResult && (
                <div style={{
                  marginTop: '14px',
                  paddingTop: '12px',
                  borderTop: '1px dashed rgba(201, 161, 90, 0.35)',
                  animation: 'dialog-enter 0.25s ease'
                }}>
                  {deliveryResult.valid ? (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#123b32', fontWeight: 600, fontSize: '13px', marginBottom: '6px' }}>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#123b32" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Estimated Delivery: <strong>{deliveryResult.deliveryDateFormatted}</strong></span>
                      </div>
                      <div style={{ fontSize: '11.5px', color: 'rgba(26, 20, 14, 0.75)', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '3px', paddingLeft: '24px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          Destination: <strong>{deliveryResult.locationName} ({deliveryResult.pincode})</strong>
                        </span>
                        <span style={{ color: '#123b32', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                          </svg>
                          Free Insured Priority Delivery &amp; Real-time Tracking
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div style={{ color: '#c94a4a', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      <span>{deliveryResult.notes}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Perks Strip */}
            <div className="pdp__perks">
              <div>
                <svg viewBox="0 0 24 24"><path d="M12 3 4 7v6c0 4.5 3.4 7.4 8 8 4.6-.6 8-3.5 8-8V7l-8-4Z"/><path d="m9 12 2 2 4-4"/></svg>
                Certified authentic — BIS hallmarked &amp; assay card enclosed
              </div>
              <div>
                <svg viewBox="0 0 24 24"><path d="M3 17h13V7H3v10Zm13-6h4l1 3v3h-5"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="17.5" cy="17.5" r="1.5"/></svg>
                Complimentary insured delivery across India, 4–7 days
              </div>
              <div>
                <svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>
                15-day easy returns &amp; lifetime exchange value
              </div>
            </div>

            {/* Accordion */}
            <div className="pdp__accordion">
              <details open>
                <summary>Details &amp; Specifications</summary>
                <p>
                  {product.name} in {product.material}. Hand-finished at Atelier Nº 1. Weight and dimensions are confirmed on the assay card included with the piece. Reference: {product.id.toUpperCase().replace(/-/g, ' · ')}.
                </p>
              </details>
              <details>
                <summary>Shipping &amp; Returns</summary>
                <p>
                  Every order ships in the signature Sree lacquer box, fully insured and tracked, within 4–7 working days across India. Returns are accepted within 15 days of delivery; personalised and engraved pieces are final sale.
                </p>
              </details>
              <details>
                <summary>Jewellery Care</summary>
                <p>
                  Store in the provided pouch away from moisture and perfume. Gold may be cleaned with warm water and a soft cloth; silver loves to be worn — its natural oils keep tarnish away. A yearly complimentary polish is included at the atelier.
                </p>
              </details>
            </div>

          </div>

        </div>

      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="section" style={{ borderTop: '1px solid var(--sage)', paddingTop: '60px', paddingBottom: '90px' }} aria-label="You may also like">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Continue Looking</span>
                <h2>You may also <em>like.</em></h2>
              </div>
              <Link href={`/${product.category.toLowerCase()}`} className="text-link">
                View All {product.category}
                <svg className="icon"><use href="#icon-arrow"></use></svg>
              </Link>
            </div>
            
            <div className="grid-products">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}

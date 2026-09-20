'use client';

import React, { useState } from 'react';
import SketchUnderline from '@/components/ui/SketchUnderline';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      localStorage.setItem('zilmor-newsletter-preference', JSON.stringify({
        email,
        consentedAt: new Date().toISOString()
      }));
      setStatus("Thank you. Your email preference is saved on this device; no email has been sent.");
      setEmail('');
    } catch {
      setStatus("Your browser could not save this preference. Please allow device storage and try again.");
    }
  };

  return (
    <section className="newsletter-section" id="newsletter" aria-labelledby="newsletter-title">
      <h2 id="newsletter-title" data-reveal>Join the Sree <SketchUnderline text="Family" /></h2>
      <p>Receive early updates on new festive collections, auspicious gold and silver arrivals, and special festive offers.</p>
      <form className="newsletter-form" id="newsletter-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="newsletter-email">Your email address</label>
        <input 
          id="newsletter-email" 
          name="email" 
          type="email" 
          placeholder="Enter your email address" 
          autoComplete="email" 
          maxLength={254} 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="button" type="submit">Join Now</button>
      </form>
      <p className="newsletter-note">We respect your privacy. Only genuine festival updates and collection launches are shared.</p>
      <div id="newsletter-status" role="status" aria-live="polite">{status}</div>
    </section>
  );
}

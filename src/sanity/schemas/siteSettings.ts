import { defineField, defineType } from 'sanity';
import { Sliders } from 'lucide-react';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings & Announcements',
  type: 'document',
  icon: Sliders,
  fields: [
    defineField({
      name: 'storeName',
      title: 'Store Brand Name',
      type: 'string',
      initialValue: 'Sree Jewellery',
    }),
    defineField({
      name: 'tagline',
      title: 'Brand Tagline',
      type: 'string',
      initialValue: 'Handcrafted in Tradition, Worn for Generations',
    }),
    defineField({
      name: 'announcements',
      title: 'Header Announcement Bar Messages',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Rotating messages at top of header (e.g. Free Insured Delivery, WhatsApp Orders, etc.)',
      initialValue: [
        'Quick & Easy WhatsApp Orders — Tap to Chat With Us',
        'Free Insured Delivery on orders above ₹1,000',
        'International & Worldwide Shipping Available',
        'Instant Video Consultation & Custom Karigari Available',
      ],
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Contact Number',
      type: 'string',
      initialValue: '+91 98765 43210',
      description: 'Used for instant chat & quick orders buttons.',
    }),
    defineField({
      name: 'supportEmail',
      title: 'Concierge Support Email',
      type: 'string',
      initialValue: 'concierge@sreejewellery.com',
    }),
    defineField({
      name: 'freeShippingThreshold',
      title: 'Free Shipping Minimum Order (₹ INR)',
      type: 'number',
      initialValue: 1000,
    }),
    defineField({
      name: 'storeAddress',
      title: 'Atelier / Store Address',
      type: 'text',
      rows: 2,
      initialValue: 'Heritage Workshop Road, Hyderabad, Telangana — 500002',
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Copyright / Heritage Note',
      type: 'string',
      initialValue: '© 2026 Sree Jewellery. 22K Gold & 925 Sterling Silver Heirlooms.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Global Site Settings & Copy',
        subtitle: 'Announcements, WhatsApp, Emails & Brand Text',
      };
    },
  },
});

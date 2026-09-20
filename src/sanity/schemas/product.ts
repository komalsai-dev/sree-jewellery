import { defineField, defineType } from 'sanity';
import { Package } from 'lucide-react';
import { SleekDeleteButton } from '../components/SleekDeleteButton';

export default defineType({
  name: 'product',
  title: 'Jewellery Product',
  type: 'document',
  icon: Package,
  groups: [
    { name: 'general', title: '1. Basic Info', default: true },
    { name: 'media', title: '2. Images & Media' },
    { name: 'pricing', title: '3. Pricing & Badge' },
    { name: 'specs', title: '4. Metal & Specs' },
  ],
  fields: [
    // 1. Basic Info
    defineField({
      name: 'name',
      title: 'Product Title / Name',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
      description: 'e.g. Temple Gold Bangles · Pair',
    }),
    defineField({
      name: 'slug',
      title: 'Product Slug (URL ID)',
      type: 'slug',
      group: 'general',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'general',
      validation: (Rule) => Rule.required(),
      description: 'Select the primary jewellery category (Rings, Bangles, Necklaces, etc.)',
    }),
    defineField({
      name: 'metal',
      title: 'Precious Metal Type',
      type: 'string',
      group: 'general',
      options: {
        list: [
          { title: 'Gold (18K / 22K)', value: 'gold' },
          { title: 'Silver (925 Sterling)', value: 'silver' },
        ],
        layout: 'radio',
      },
      initialValue: 'gold',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'material',
      title: 'Material Summary',
      type: 'string',
      group: 'general',
      initialValue: '22K Gold',
      description: 'e.g. 22K Gold, 18K Gold, 925 Silver',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'collection',
      title: 'Design Collection',
      type: 'string',
      group: 'general',
      description: 'e.g. Temple Gold Heritage, Moonlit Silver, Filigree Craft, Daily Luxury',
    }),
    defineField({
      name: 'description',
      title: 'Artisan Story / Description',
      type: 'text',
      rows: 3,
      group: 'general',
      description: 'Editorial description shown on product card and PDP page.',
    }),

    // Delete Button placed directly after Artisan Story / Description
    defineField({
      name: 'deleteButton',
      title: 'Delete Product',
      type: 'string',
      group: 'general',
      components: {
        field: (props) => props.children as any,
        input: SleekDeleteButton,
      },
    }),

    // 2. Images & Media
    defineField({
      name: 'image',
      title: 'Main Product Cover Image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      description: 'High-res primary product photograph on clean studio neutral background.',
    }),
    defineField({
      name: 'gallery',
      title: 'Additional Gallery Images',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      description: 'Multiple angle shots, lifestyle model photography, or video stills.',
    }),

    // 3. Pricing & Badges
    defineField({
      name: 'price',
      title: 'Regular Price (₹ INR)',
      type: 'number',
      group: 'pricing',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'oldPrice',
      title: 'Original / Strike-through Price (₹ INR)',
      type: 'number',
      group: 'pricing',
      description: 'Optional MRP before discount.',
    }),
    defineField({
      name: 'originalPrice',
      title: 'Original Price',
      type: 'number',
      group: 'pricing',
      hidden: true,
    }),
    defineField({
      name: 'badge',
      title: 'Promotional Tag / Badge',
      type: 'string',
      group: 'pricing',
      options: {
        list: [
          { title: 'None', value: '' },
          { title: 'Festive Bestseller', value: 'Bestseller' },
          { title: 'New Arrival', value: 'New' },
          { title: 'Trending', value: 'Trending' },
          { title: 'Temple Karigari', value: 'Temple Karigari' },
        ],
      },
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock Availability',
      type: 'boolean',
      group: 'pricing',
      initialValue: true,
    }),
    defineField({
      name: 'rating',
      title: 'Average Rating (1.0 - 5.0)',
      type: 'number',
      group: 'pricing',
      initialValue: 4.9,
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'reviews',
      title: 'Review Count',
      type: 'number',
      group: 'pricing',
      initialValue: 50,
    }),

    // 4. Metal & Specs
    defineField({
      name: 'sku',
      title: 'Design Code / SKU',
      type: 'string',
      group: 'specs',
      description: 'e.g. SREE-GLD-BNG-01',
    }),
    defineField({
      name: 'purity',
      title: 'Hallmark & Metal Purity',
      type: 'string',
      group: 'specs',
      description: 'e.g. 22KT Solid Gold (BIS 916) or 925 Sterling Silver Hallmarked',
    }),
    defineField({
      name: 'metalWeight',
      title: 'Gross / Net Metal Weight',
      type: 'string',
      group: 'specs',
      description: 'e.g. 32.40 g',
    }),
    defineField({
      name: 'sizes',
      title: 'Available Sizes / Variations',
      type: 'array',
      group: 'specs',
      of: [{ type: 'string' }],
      description: 'e.g. 2.4 (Small), 2.6 (Standard), US 6, US 7, 18 in Chain, etc.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category.name',
      price: 'price',
      media: 'image',
      badge: 'badge',
      metal: 'metal',
    },
    prepare({ title, category, price, media, badge, metal }) {
      const formattedPrice = price
        ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price)
        : 'Price pending';
      const badgeText = badge ? ` [${badge}]` : '';
      const metalText = metal ? ` · ${metal.toUpperCase()}` : '';
      return {
        title: title || 'Untitled Product',
        subtitle: `${category || 'Uncategorized'}${metalText} — ${formattedPrice}${badgeText}`,
        media,
      };
    },
  },
});

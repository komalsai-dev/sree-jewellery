import { defineField, defineType } from 'sanity';
import { Tag } from 'lucide-react';
import { SleekDeleteButton } from '../components/SleekDeleteButton';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: Tag,
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. Rings, Necklaces, Earrings, Bangles, Harams, Kante, etc.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Identifier)',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'The URL path for this category (e.g. rings, necklaces, 18k-gold-plated)',
    }),
    defineField({
      name: 'subtitle',
      title: 'Listing Subtitle',
      type: 'string',
      description: 'e.g. Solitaires, Bands & Pavé Settings',
    }),
    defineField({
      name: 'description',
      title: 'Listing Header Description',
      type: 'text',
      rows: 3,
      description: 'Short luxury introduction shown above products in this category.',
    }),
    defineField({
      name: 'bannerImage',
      title: 'Category Header / Banner Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Controls position in menus and category tabs (lower numbers show first).',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured in Nav Dropdown / Home',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'deleteButton',
      title: 'Delete Category',
      type: 'string',
      components: {
        field: (props) => props.children as any,
        input: SleekDeleteButton,
      },
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name (A-Z)',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'subtitle',
      media: 'bannerImage',
      order: 'order',
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title: title || 'Untitled Category',
        subtitle: `#${order ?? 0} · ${subtitle || 'No subtitle'}`,
        media,
      };
    },
  },
});

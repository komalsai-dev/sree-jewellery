import { defineField, defineType } from 'sanity';
import { Image as ImageIcon } from 'lucide-react';
import { SleekDeleteButton } from '../components/SleekDeleteButton';

export default defineType({
  name: 'banner',
  title: 'Homepage Banner / Slide',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Banner Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. 18k Gold Plated, 925 Silver, Palakka Delight',
    }),
    defineField({
      name: 'slug',
      title: 'Banner Identifier / Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'Unique key (e.g. gold-plated, silver-collection, palakka-delight, daily-wear, campaign-festive)',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subheading / Tagline',
      type: 'string',
      description: 'e.g. "Crafted to shine. Designed to last"',
    }),
    defineField({
      name: 'tag',
      title: 'Small Badge / Kicker Tag',
      type: 'string',
      description: 'e.g. HERITAGE ATELIER · BIS 916',
    }),
    defineField({
      name: 'image',
      title: 'Banner Background Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Label',
      type: 'string',
      initialValue: 'Explore Collection',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link URL',
      type: 'string',
      initialValue: '/gold',
      description: 'e.g. /gold, /silver, /rings, /necklaces',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Active / Published',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'deleteButton',
      title: 'Delete Banner',
      type: 'string',
      components: {
        field: (props) => props.children as any,
        input: SleekDeleteButton,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image',
      isActive: 'isActive',
    },
    prepare({ title, subtitle, media, isActive }) {
      return {
        title: `${isActive ? '🟢 ' : '⚪ '}${title || 'Untitled Banner'}`,
        subtitle: subtitle || 'No subtitle',
        media,
      };
    },
  },
});

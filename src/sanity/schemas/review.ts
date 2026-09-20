import { defineField, defineType } from 'sanity';
import { Star } from 'lucide-react';
import { SleekDeleteButton } from '../components/SleekDeleteButton';

export default defineType({
  name: 'review',
  title: 'Customer Review',
  type: 'document',
  icon: Star,
  fields: [
    defineField({
      name: 'author',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'product',
      title: 'Reviewed Product',
      type: 'reference',
      to: [{ type: 'product' }],
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1 - 5 Stars)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'reviewText',
      title: 'Review Comments',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isApproved',
      title: 'Approved for Display',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'createdAt',
      title: 'Review Date',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
    defineField({
      name: 'deleteButton',
      title: 'Delete Review',
      type: 'string',
      components: {
        field: (props) => props.children as any,
        input: SleekDeleteButton,
      },
    }),
  ],
  preview: {
    select: {
      author: 'author',
      productName: 'product.name',
      rating: 'rating',
      isApproved: 'isApproved',
    },
    prepare({ author, productName, rating, isApproved }) {
      const stars = '★'.repeat(rating || 5);
      return {
        title: `${isApproved ? '🟢' : '⏳'} ${author || 'Anonymous'} — ${stars}`,
        subtitle: productName || 'General Review',
      };
    },
  },
});

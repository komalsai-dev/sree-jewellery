import { createClient } from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url';
import { apiVersion, dataset, projectId } from './env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false to avoid caching lag when uploading in Studio
  perspective: 'published',
});

// Image URL Builder helper for responsive studio images
const imageBuilder = createImageUrlBuilder({ projectId, dataset });

export const urlForImage = (source: any) => {
  return imageBuilder.image(source).auto('format').fit('max');
};

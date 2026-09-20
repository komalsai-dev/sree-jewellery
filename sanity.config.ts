import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemas';
import { projectId, dataset, apiVersion } from './src/sanity/env';
import { structure } from './src/sanity/structure';
import { sreeTheme } from './src/sanity/theme';
export default defineConfig({
  basePath: '/studio',
  name: 'Sree_Jewellery_Studio',
  title: 'Sree Jewellery CMS',
  theme: sreeTheme,
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {
        id: 'product-by-category',
        title: 'Product by Category',
        schemaType: 'product',
        parameters: [{ name: 'categoryId', type: 'string' }],
        value: ({ categoryId }: { categoryId: string }) => ({
          category: {
            _type: 'reference',
            _ref: categoryId,
          },
        }),
      },
    ],
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});

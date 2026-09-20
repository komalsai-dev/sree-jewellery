import { StructureResolver } from 'sanity/structure';
import { apiVersion } from './env';
import { 
  Sparkles, 
  Package, 
  Tag, 
  Image as ImageIcon, 
  Sliders, 
  Star 
} from 'lucide-react';

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Sree Jewellery Atelier CMS')
    .items([
      // 1. Primary Worklow: Products Organized by Category
      S.listItem()
        .id('productsByCategory')
        .title('Products by Category')
        .icon(Sparkles)
        .child(
          S.documentList()
            .id('categoryListForProducts')
            .title('Select Jewellery Category')
            .apiVersion(apiVersion)
            .filter('_type == "category"')
            .defaultOrdering([{ field: 'order', direction: 'asc' }, { field: 'name', direction: 'asc' }])
            .child((categoryId) =>
              S.documentList()
                .id(`products-under-${categoryId}`)
                .title('Category Products')
                .apiVersion(apiVersion)
                .filter('_type == "product" && category._ref == $categoryId')
                .params({ categoryId })
                .defaultOrdering([{ field: 'name', direction: 'asc' }])
                .initialValueTemplates([
                  S.initialValueTemplateItem('product-by-category', { categoryId }),
                ])
            )
        ),

      // 2. Master All Products List (for global search / quick overview)
      S.listItem()
        .id('allProducts')
        .title('All Products (Master List)')
        .icon(Package)
        .child(
          S.documentList()
            .id('allProductsList')
            .title('All Jewellery Products')
            .apiVersion(apiVersion)
            .filter('_type == "product"')
            .defaultOrdering([{ field: 'name', direction: 'asc' }])
        ),

      S.divider(),

      // 3. Category Metadata & Header Banners
      S.listItem()
        .id('categories')
        .title('Categories Management')
        .icon(Tag)
        .child(
          S.documentList()
            .id('categoriesManagerList')
            .title('Store Categories & Headings')
            .apiVersion(apiVersion)
            .filter('_type == "category"')
            .defaultOrdering([{ field: 'order', direction: 'asc' }, { field: 'name', direction: 'asc' }])
        ),

      // 4. Homepage Hero Slides & Banners
      S.listItem()
        .id('banners')
        .title('Homepage Banners & Slides')
        .icon(ImageIcon)
        .child(
          S.documentList()
            .id('bannerList')
            .title('Banners & Hero Slides')
            .apiVersion(apiVersion)
            .filter('_type == "banner"')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      // 5. Global Site Settings (Announcements, WhatsApp, Emails, Address)
      S.listItem()
        .id('siteSettings')
        .title('Site Settings & Announcements')
        .icon(Sliders)
        .child(
          S.editor()
            .id('siteSettingsEditor')
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Global Store Settings & Text')
        ),

      // 6. Customer Product Reviews
      S.listItem()
        .id('customerReviews')
        .title('Customer Reviews')
        .icon(Star)
        .child(
          S.documentList()
            .id('reviewsList')
            .title('Customer Reviews')
            .apiVersion(apiVersion)
            .filter('_type == "review"')
            .defaultOrdering([{ field: 'createdAt', direction: 'desc' }])
        ),
    ]);

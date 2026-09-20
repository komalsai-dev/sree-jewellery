import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope, Cinzel_Decorative } from 'next/font/google';
import './globals.css';
import { ProductProvider } from '@/context/ProductContext';
import { getProducts, getBanners } from '@/sanity/fetch';
import { CartProvider } from '@/context/CartContext';
import { ModalProvider } from '@/context/ModalContext';
import SiteHeader from '@/layout/SiteHeader';
import SiteFooter from '@/layout/SiteFooter';
import MobileNav from '@/layout/MobileNav';
import LogoSplashIntro from '@/layout/LogoSplashIntro';
import SvgSprites from '@/ui/SvgSprites';
import Toast from '@/ui/Toast';
import CartDrawerModal from '@/modals/CartDrawerModal';
import QuickViewModal from '@/modals/QuickViewModal';
import SearchModal from '@/modals/SearchModal';
import CareInfoModal from '@/modals/CareInfoModal';
import SizeGuideModal from '@/modals/SizeGuideModal';
import ScrollObserver from '@/ui/ScrollObserver';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--serif',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--sans',
  display: 'swap',
});

const cinzelDeco = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sree Jewellery · Pure Indian Heritage, Crafted for Every Generation',
  description: 'Sree Jewellery · Authentic 22K gold and certified 925 sterling silver jewellery handcrafted with ancient Indian temple karigari for weddings, festivals, and family celebrations.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialProducts = await getProducts();
  const initialBanners = await getBanners();

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${cormorant.variable} ${manrope.variable} ${cinzelDeco.variable}`}>
      <head>
        <meta name="theme-color" content="var(--ivory)" />
      </head>
      <body>
        {/* Exact Reusable SVG Symbols and Flat Ring Art */}
        <SvgSprites />

        <ProductProvider initialProducts={initialProducts} initialBanners={initialBanners}>
          <CartProvider>
            <ModalProvider>
              {/* Splash / Swappable Logo Intro */}
              <LogoSplashIntro />

            <a className="sr-only" href="#main-content">Skip to content</a>

            {/* Sticky Header & Mobile Nav */}
            <SiteHeader />
            <MobileNav />

            {/* Main Content */}
            <main id="main-content">{children}</main>

            {/* Footer */}
            <SiteFooter />

            {/* Exact Modals & Dialogs */}
            <SearchModal />
            <QuickViewModal />
            <CartDrawerModal />
            <CareInfoModal />
            <SizeGuideModal />
            <ScrollObserver />
            <Toast />
          </ModalProvider>
        </CartProvider>
      </ProductProvider>
    </body>
  </html>
  );
}

import { NextResponse } from 'next/server';
import { getProducts, getAnnouncements, getBanners } from '@/sanity/fetch';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const products = await getProducts();
    const announcements = await getAnnouncements();
    const banners = await getBanners();
    return NextResponse.json({
      success: true,
      products,
      announcements,
      banners
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

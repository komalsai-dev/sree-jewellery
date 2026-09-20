import { CartItem, Product } from '@/types';

export const WHATSAPP_NUMBER = '917995228713';
export const DISPLAY_PHONE = '+91 79952 28713';

// Generate WhatsApp direct quote / purchase link for a single product
export function getProductWhatsAppUrl(product: {
  id?: string;
  name: string;
  price: number;
  material?: string;
  metal?: string;
  sku?: string;
  size?: string;
}) {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(product.price);

  const text = `Namaste Sree Jewellery,

I would like to inquire about / purchase the following handcrafted piece:

✦ *${product.name}*
- Price: *${formattedPrice}*
- Material / Purity: ${product.material || '22K Gold / 925 Silver (BIS Certified)'}
${product.size ? `- Selected Size / Option: ${product.size}\n` : ''}- SKU / Product Code: ${product.sku || product.id || 'SREE-EXCLUSIVE'}

Could you please confirm availability, making timeframe, and payment/delivery details? Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// Generate WhatsApp order inquiry link for the full Shopping Bag
export function getCartWhatsAppUrl(
  cart: CartItem[],
  getProductById: (id: string) => Product | undefined,
  subtotal: number
) {
  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(subtotal);

  const itemsList = cart
    .map((item, index) => {
      const prod = getProductById(item.id);
      const itemPrice = prod
        ? new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
          }).format(prod.price * item.quantity)
        : '₹0';

      return `${index + 1}. *${prod?.name || 'Jewellery Piece'}*
   - Metal/Purity: ${prod?.material || 'BIS Hallmarked'}
   - Size / Option: ${item.size}
   - Quantity: ${item.quantity}
   - Amount: ${itemPrice}`;
    })
    .join('\n\n');

  const text = `Namaste Sree Jewellery,

I would like to place an order / request a final price quote for the items in my Jewellery Box:

${itemsList}

━━━━━━━━━━━━━━━━━━━━━
*Total Estimated Value: ${formattedTotal}*
━━━━━━━━━━━━━━━━━━━━━

Please confirm item availability, hallmark certification, and provide the payment & insured delivery process. Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// Generate general consultation WhatsApp link
export function getConsultationWhatsAppUrl(message?: string) {
  const text = message || `Namaste Sree Jewellery, I would like to inquire about custom karigari designs and fine jewellery consultations.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

import { business } from '@/lib/site-data';

export interface PreQualifiedOrderPayload {
  product: string;
  quantity: string;
  customerType?: string;
  deliveryArea: string;
  notes?: string;
}

/**
 * Builds a pre-qualified WhatsApp URL with a pre-filled structured order message.
 */
export function buildPreQualifiedWhatsAppUrl(
  payload: PreQualifiedOrderPayload,
  phone: string = business.whatsapp
): string {
  const parts = [
    `Hi N&N Poultry Palace! I would like to place an order:`,
    `  Product: ${payload.product}`,
    `  Quantity: ${payload.quantity}`,
    `  Delivery Location: ${payload.deliveryArea}`,
  ];

  if (payload.customerType) {
    parts.push(`  Buyer Type: ${payload.customerType}`);
  }

  if (payload.notes?.trim()) {
    parts.push(`  Notes/Request: ${payload.notes.trim()}`);
  }

  parts.push(`\nPlease confirm availability and delivery slot.`);

  const text = parts.join('\n');
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
}

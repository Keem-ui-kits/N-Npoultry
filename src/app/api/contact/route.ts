import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { contactSchema } from '@/lib/schemas/contact';
import { escapeHtml, persistToSupabase } from '@/lib/server-utils';
import { getRatelimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    // 1. Rate Limiting (Upstash Persistent)
    let ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
    if (ip.includes(',')) {
      const firstIp = ip.split(',')[0];
      if (firstIp) ip = firstIp.trim();
    }

    const rl = getRatelimit();
    if (rl) {
      const { success } = await rl.limit(ip);
      if (!success) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      }
    } else {
      console.warn('UPSTASH environment variables not defined. Skipping rate limiting.');
    }

    // 2. Data Validation
    const body = (await request.json()) as unknown;
    const validatedData = contactSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: validatedData.error.format() },
        { status: 400 }
      );
    }

    const { name, email, phone, productInterest, customerType, quantity, deliveryArea, message } =
      validatedData.data;

    // 3 & 4. Persist to Supabase and send emails concurrently
    const emailTask = process.env.RESEND_API_KEY
      ? Promise.all([
          resend.emails.send({
            from: 'N&N Poultry Palace <noreply@nnpoultry.co.ke>',
            to: 'palacepoultryn.n@gmail.com',
            subject: `New ${escapeHtml(productInterest)} enquiry from ${escapeHtml(name)}`,
            html: `
          <h2>New Contact Form Lead</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email ?? 'N/A')}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone ?? 'N/A')}</p>
          <p><strong>Product Interest:</strong> ${escapeHtml(productInterest)}</p>
          <p><strong>Customer Type:</strong> ${escapeHtml(customerType ?? 'N/A')}</p>
          <p><strong>Quantity Needed:</strong> ${escapeHtml(quantity ?? 'N/A')}</p>
          <p><strong>Delivery Location:</strong> ${escapeHtml(deliveryArea ?? 'N/A')}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
            ${escapeHtml(message ?? 'No additional message provided')}
          </div>
        `,
            replyTo: email || undefined,
          }),
          ...(email
            ? [
                resend.emails.send({
                  from: 'N&N Poultry Palace <noreply@nnpoultry.co.ke>',
                  to: email,
                  subject: 'We received your enquiry - N&N Poultry Palace',
                  html: `<p>Hi ${escapeHtml(name)},</p><p>Thank you for reaching out regarding <strong>${escapeHtml(productInterest)}</strong>. We've received your request and will get back to you within a few hours.</p><p>For faster response, you can also connect directly on WhatsApp: <a href="https://wa.me/254113377623">Chat on WhatsApp</a>.</p><p>- N&N Poultry Palace</p>`,
                  replyTo: 'palacepoultryn.n@gmail.com',
                }),
              ]
            : []),
        ])
      : (() => {
          console.warn('RESEND_API_KEY is not defined. Skipping email sending.');
          return new Promise((resolve) => setTimeout(resolve, 800));
        })();

    await Promise.all([
      persistToSupabase('contact_submissions', {
        name,
        email,
        phone,
        productInterest,
        customerType,
        quantity,
        deliveryArea,
        message,
      }),
      emailTask,
    ]);

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    if (error instanceof Error) {
      console.error('API Error:', error.message);
    }
    return NextResponse.json({ error: 'Failed to process submission' }, { status: 500 });
  }
}

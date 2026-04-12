import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { getRatelimit } from '@/lib/rate-limit';
import { quoteSchema } from '@/lib/schemas/quote';

export const dynamic = 'force-dynamic';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function persistToSupabase(data: {
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  delivery_area: string;
  frequency: string;
  message?: string;
}) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) return;

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);
    await supabase.from('quote_submissions').insert([data]);
  } catch (err) {
    console.error('Supabase insert failed (quote):', err);
  }
}

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    // 1. Rate Limiting (Upstash Persistent)
    let ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
    if (ip.includes(',')) {
      const firstIp = ip.split(',')[0];
      if (firstIp) {
        ip = firstIp.trim();
      }
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
    }

    // 2. Data Validation
    const body = await request.json() as unknown;
    const validatedData = quoteSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: z.treeifyError(validatedData.error) },
        { status: 400 }
      );
    }

    const {
      companyName,
      contactName,
      email,
      phone,
      product,
      quantity,
      deliveryArea,
      frequency,
      message,
    } = validatedData.data;

    // 3. Persist to Supabase (before email — DB write is independent of email success)
    await persistToSupabase({
      company_name: companyName,
      contact_name: contactName,
      email,
      phone,
      product,
      quantity,
      delivery_area: deliveryArea,
      frequency,
      message,
    });

    // 4. Process the form - Send Email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'N&N Poultry Palace <noreply@nnpoultry.co.ke>',
        to: 'palacepoultryn.n@gmail.com',
        subject: `New Quote Request from ${companyName}`,
        html: `
          <h2>New Quote Request Submission</h2>
          <p><strong>Company:</strong> ${escapeHtml(companyName)}</p>
          <p><strong>Contact Name:</strong> ${escapeHtml(contactName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Product:</strong> ${escapeHtml(product)}</p>
          <p><strong>Quantity:</strong> ${escapeHtml(quantity)}</p>
          <p><strong>Delivery Area:</strong> ${escapeHtml(deliveryArea)}</p>
          <p><strong>Frequency:</strong> ${escapeHtml(frequency)}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
            ${escapeHtml(message ?? 'No message provided')}
          </div>
        `,
        replyTo: email,
      });

      // 5. Customer auto-reply
      await resend.emails.send({
        from: 'N&N Poultry Palace <noreply@nnpoultry.co.ke>',
        to: email,
        subject: 'We received your quote request — N&N Poultry Palace',
        html: `<p>Hi ${escapeHtml(contactName)},</p><p>Thank you for your interest in our <strong>${escapeHtml(product)}</strong>. We've received your quote request and will be in touch within 24 hours.</p><p>— N&N Poultry Palace</p>`,
        replyTo: 'palacepoultryn.n@gmail.com',
      });
    } else {
      console.warn('RESEND_API_KEY is not defined. Skipping email sending.');
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    return NextResponse.json({ success: true, message: 'Quote request sent successfully!' });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Quote API Error:', error.message);
    }
    return NextResponse.json({ error: 'Failed to process submission' }, { status: 500 });
  }
}

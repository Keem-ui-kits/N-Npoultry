import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { getRatelimit } from '@/lib/rate-limit';
import { quoteSchema } from '@/lib/schemas/quote';

export const dynamic = 'force-dynamic';

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

    // 3. Process the form - Send Email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'N&N Poultry Palace <noreply@nnpoultrypalace.vercel.app>',
        to: 'info@nnpoultry.co.ke',
        subject: `New Quote Request from ${companyName}`,
        html: `
          <h2>New Quote Request Submission</h2>
          <p><strong>Company:</strong> ${companyName}</p>
          <p><strong>Contact Name:</strong> ${contactName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Product:</strong> ${product}</p>
          <p><strong>Quantity:</strong> ${quantity}</p>
          <p><strong>Delivery Area:</strong> ${deliveryArea}</p>
          <p><strong>Frequency:</strong> ${frequency}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
            ${message ?? 'No message provided'}
          </div>
        `,
        replyTo: email,
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

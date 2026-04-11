import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

import { contactSchema } from '@/lib/schemas/contact';

import { getRatelimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

async function persistToSupabase(data: {
  name: string;
  email: string;
  website?: string;
  message?: string;
}) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) return;

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);
    await supabase.from('contact_submissions').insert([data]);
  } catch (err) {
    console.error('Supabase insert failed (contact):', err);
  }
}

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    // 1. Rate Limiting (Upstash Persistent)
    let ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
    // If x-forwarded-for contains multiple IPs, use the first one
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
    } else {
      console.warn('UPSTASH environment variables not defined. Skipping rate limiting.');
    }

    // 2. Data Validation
    const body = await request.json() as unknown;
    const validatedData = contactSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: z.treeifyError(validatedData.error) },
        { status: 400 }
      );
    }

    const { name, email, website, message } = validatedData.data;

    // 3. Persist to Supabase (before email — DB write is independent of email success)
    await persistToSupabase({ name, email, website, message });

    // 4. Process the form - Send Email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'N&N Poultry Palace <noreply@nnpoultry.co.ke>',
        to: 'palacepoultryn.n@gmail.com',
        subject: `New enquiry from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Website:</strong> ${website ?? 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
            ${message ?? 'No message provided'}
          </div>
        `,
        replyTo: email,
      });

      // 5. Customer auto-reply
      await resend.emails.send({
        from: 'N&N Poultry Palace <noreply@nnpoultry.co.ke>',
        to: email,
        subject: 'We received your message — N&N Poultry Palace',
        html: `<p>Hi ${name},</p><p>Thank you for reaching out. We've received your message and will get back to you within 24 hours.</p><p>— N&N Poultry Palace</p>`,
        replyTo: 'palacepoultryn.n@gmail.com',
      });
    } else {
      console.warn('RESEND_API_KEY is not defined. Skipping email sending.');
      // Simulate network delay for testing locally
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    if (error instanceof Error) {
      console.error('API Error:', error.message);
    }
    return NextResponse.json({ error: 'Failed to process submission' }, { status: 500 });
  }
}

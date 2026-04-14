'use server';

import nodemailer from 'nodemailer';
import qs from 'qs';

/**
 * Server Action: Subscribe to Newsletter
 * Handles Captcha verification, duplicate email check, and creation in Strapi.
 */
export async function subscribeNewsletter(email: string, captchaToken: string) {
  if (!email || !captchaToken) {
    return { error: 'Email and Captcha token are required.' };
  }

  try {
    // 1. Verify ReCAPTCHA with Google
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecret) {
      return { error: 'Missing required fields.' };
    }

    const verifyRes = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${captchaToken}`, { method: 'POST' });
    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return { error: 'Captcha verification failed. Please try again.' };
    }

    // 2. Strapi Integration
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
    const apiToken = process.env.STRAPI_API_TOKEN;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (apiToken) {
      headers['Authorization'] = `Bearer ${apiToken}`;
    }

    // 2.a Check if email already exists
    const query = qs.stringify({
      filters: {
        emailAddress: {
          $eq: email,
        },
      },
    });

    const checkRes = await fetch(`${apiUrl}/api/email-subscribers?${query}`, {
      headers,
    });
    const existing = await checkRes.json();

    if (existing?.data?.length > 0) {
      // Email already exists, return success to avoid leaking information
      return { success: true, message: 'Already subscribed.' };
    }

    // 2.b Create new subscriber
    const saveRes = await fetch(`${apiUrl}/api/email-subscribers`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        data: {
          emailAddress: email,
        },
      }),
    });

    const saved = await saveRes.json();

    if (saved?.error) {
      return { error: 'Failed to save subscription. Please try again later.' };
    }

    // 3. Send Confirmation Email (Nodemailer + Mailpit)
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'localhost',
        port: Number(process.env.SMTP_PORT) || 1025,
        secure: false, // true for 465, false for other ports
        auth: process.env.SMTP_USER
          ? {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            }
          : undefined,
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || '"Wettenhalls" <no-reply@wettenhalls.com.au>',
        to: email,
        subject: 'Wettenhalls Newsletter Subscription',
        text: `Thank you for subscribing to the Wettenhalls newsletter!`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #FBBF24; text-transform: uppercase;">Subscription Confirmed</h2>
            <p>Thank you for subscribing to stay updated with the latest news and insights from <strong>Wettenhalls</strong>.</p>
            <p>Best regards,<br/>The Wettenhalls Team</p>
          </div>
        `,
      });
    } catch {
      // Log the error but don't fail the whole process since the record was saved in Strapi
    }

    return { success: true };
  } catch {
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}

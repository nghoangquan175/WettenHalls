'use server';

import nodemailer from 'nodemailer';

/**
 * Server Action: Submit Contact Form
 * Handles Captcha verification, creation in Strapi, and sending detailed confirmation email.
 */
export async function submitContact(data: { firstName: string; lastName: string; email: string; phone: string; subject: string; message: string; captchaToken: string }) {
  const { firstName, lastName, email, phone, subject, message, captchaToken } = data;

  if (!email || !captchaToken) {
    return { error: 'Missing required fields.' };
  }

  try {
    // 1. Verify ReCAPTCHA with Google
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaSecret) {
      // Missing secret key
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

    // Create new contact submission
    const saveRes = await fetch(`${apiUrl}/api/contact-submissions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        data: {
          firstName,
          lastName,
          email,
          phoneNumber: phone, // Map phone -> phoneNumber
          selectSubject: subject, // Map subject -> selectSubject
          message,
        },
      }),
    });

    const saved = await saveRes.json();

    if (saved?.error) {
      return { error: 'Failed to save contact message. Please try again later.' };
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
        subject: `Wettenhalls Inquiry: ${subject}`,
        text: `Hello ${firstName}, we have received your message regarding "${subject}".`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #fcfcfc;">
            <div style="background-color: #1a1a1a; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
               <h1 style="color: #FBBF24; text-transform: uppercase; margin: 0; font-size: 24px;">Message Received</h1>
            </div>
            <div style="padding: 30px; background-color: #ffffff; border-left: 1px solid #eee; border-right: 1px solid #eee; border-bottom: 1px solid #eee; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; color: #333;">Hello <strong>${firstName} ${lastName}</strong>,</p>
              <p style="font-size: 16px; color: #333; line-height: 1.5;">Thank you for reaching out to Wettenhalls. We have successfully received your inquiry and our team will get back to you shortly.</p>
              
              <div style="margin: 30px 0; padding: 20px; background-color: #f4f4f4; border-radius: 8px; border-left: 4px solid #FBBF24;">
                <h2 style="margin-top: 0; color: #1a1a1a; font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 10px; text-transform: uppercase;">Submission Details</h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                  <tr>
                    <td style="padding: 8px 0; color: #666; width: 100px;"><strong>Name:</strong></td>
                    <td style="padding: 8px 0; color: #333;">${firstName} ${lastName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
                    <td style="padding: 8px 0; color: #333;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td>
                    <td style="padding: 8px 0; color: #333;">${phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;"><strong>Subject:</strong></td>
                    <td style="padding: 8px 0; color: #333;">${subject}</td>
                  </tr>
                </table>
                <div style="margin-top: 15px;">
                  <strong style="color: #666;">Message:</strong>
                  <div style="margin-top: 8px; padding: 15px; background-color: #fff; border: 1px solid #e0e0e0; border-radius: 4px; font-style: italic; white-space: pre-wrap; color: #444;">${message}</div>
                </div>
              </div>
              
              <p style="font-size: 14px; color: #666;">Best regards,<br/><strong style="color: #1a1a1a;">The Wettenhalls Team</strong></p>
            </div>
            <div style="text-align: center; margin-top: 25px; color: #999; font-size: 12px;">
              &copy; ${new Date().getFullYear()} Wettenhalls. This is an automated confirmation of your contact form submission.
            </div>
          </div>
        `,
      });
    } catch {
      // Silent catch for email error as the record was already saved
    }

    return { success: true };
  } catch {
    // Top-level error
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}

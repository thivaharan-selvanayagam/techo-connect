import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req) {
  try {
    const { name, email, phone, type, message } = await req.json()

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and Phone are required' }, { status: 400 })
    }

    // SMTP Configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER || 'thivasel@gmail.com',
        pass: process.env.SMTP_PASS // Gmail App Password
      }
    })

    const mailOptions = {
      from: `"Techo Connect Web" <${process.env.SMTP_USER || 'thivasel@gmail.com'}>`,
      to: 'thivasel@gmail.com',
      replyTo: email || undefined,
      subject: `[Techo Connect] New ${type.toUpperCase()} Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px; max-width: 600px;">
          <h2 style="color: #0AAD6E;">New Contact Inquiry Received</h2>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 15px 0;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone / WhatsApp:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email || 'Not provided'}</p>
          <p><strong>Inquiry Category:</strong> ${type}</p>
          <br />
          <p><strong>Message Payload:</strong></p>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #edf2f7; color: #334155;">
            ${message || 'No additional message text.'}
          </div>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: 'Delivered to thivasel@gmail.com' })
  } catch (error) {
    console.error('Contact Email Error:', error)
    return NextResponse.json({ error: error.message || 'Server failed to dispatch email' }, { status: 500 })
  }
}
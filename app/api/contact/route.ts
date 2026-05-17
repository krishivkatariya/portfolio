import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const recipientEmail = process.env.CONTACT_EMAIL || "krishivkatariya8116@gmail.com"
const gmailUser = process.env.GMAIL_USER
const gmailPass = process.env.GMAIL_PASS

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    if (!gmailUser || !gmailPass) {
      return NextResponse.json(
        { error: "Email service is not configured. Set GMAIL_USER and GMAIL_PASS." },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      }
    })

    const mailOptions = {
      from: gmailUser,
      to: recipientEmail,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to send message" },
      { status: 500 }
    )
  }
}

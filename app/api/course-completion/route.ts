import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const recipientEmail = process.env.CONTACT_EMAIL || "krishivkatariya8116@gmail.com"
const gmailUser = process.env.GMAIL_USER || process.env.EMAIL_USER || process.env.MAIL_USER
const gmailPass = process.env.GMAIL_PASS || process.env.EMAIL_PASS || process.env.MAIL_PASS

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { degree, institution, completionDate } = body

    if (!degree || !institution || !completionDate) {
      return NextResponse.json(
        { error: "Missing required course completion data." },
        { status: 400 }
      )
    }

    if (!gmailUser || !gmailPass) {
      return NextResponse.json(
        {
          error:
            "Email service is not configured. Set GMAIL_USER and GMAIL_PASS (or EMAIL_USER and EMAIL_PASS)."
        },
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
      subject: `Course Completed: ${degree}`,
      text: `The course ${degree} at ${institution} has been automatically marked as completed on ${completionDate}.`,
      html: `<p><strong>Course:</strong> ${degree}</p><p><strong>Institution:</strong> ${institution}</p><p><strong>Completion Date:</strong> ${completionDate}</p><p>This notification was generated automatically by the portfolio.</p>`
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: "Completion notification sent." })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to send completion notification" },
      { status: 500 }
    )
  }
}

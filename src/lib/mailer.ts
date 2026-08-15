import nodemailer from "nodemailer";

// Sends the OTP email. Without SMTP configuration (local dev) the code is
// logged to the server console instead.
export async function sendOtpEmail(email: string, code: string) {
  const host = process.env.SMTP_HOST;
  if (!host) {
    console.log(`[dev] OTP for ${email}: ${code}`);
    return;
  }
  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: `${code} is your Instagraphic sign-in code`,
    text: `Your Instagraphic sign-in code is ${code}. It expires in 10 minutes.\n\nIf you did not request this, ignore this email.`,
  });
}

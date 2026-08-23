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
    from: { name: "Instagraphic", address: (process.env.SMTP_FROM || process.env.SMTP_USER) as string },
    to: email,
    subject: `${code} is your Instagraphic sign-in code`,
    text: `Your Instagraphic sign-in code is ${code}. It expires in 10 minutes.\n\nIf you did not request this, ignore this email.`,
  });
}

// Notifies a gift recipient. Credits are already on the account tied to
// their email; signing in with it makes them available.
export async function sendGiftEmail(email: string, credits: number, fromEmail: string) {
  const host = process.env.SMTP_HOST;
  if (!host) {
    console.log(`[dev] gift for ${email}: ${credits} credits from ${fromEmail}`);
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
  const plural = credits === 1 ? "credit" : "credits";
  const site = "https://www.instagraphic.app";
  await transporter.sendMail({
    from: { name: "Instagraphic", address: (process.env.SMTP_FROM || process.env.SMTP_USER) as string },
    to: email,
    subject: `You received ${credits} Instagraphic ${plural}`,
    text: `${fromEmail} sent you ${credits} ${plural} on Instagraphic.\n\nSign in at ${site} with this email address and the ${plural} will be waiting in your account. Each credit unlocks one graphic for unlimited SVG and PNG downloads.`,
    html: `<div style="font-family:Helvetica,Arial,sans-serif;font-size:18px;line-height:1.6;color:#212529;max-width:600px;margin:0 auto;padding:24px">
<p style="font-size:22px;font-weight:bold;margin:0 0 16px">${fromEmail} sent you ${credits} ${plural} on Instagraphic.</p>
<p style="margin:0 0 16px">Sign in at <a href="${site}" style="color:#0d6efd">${site.replace("https://", "")}</a> with this email address and the ${plural} will be waiting in your account.</p>
<p style="margin:0 0 24px">Each credit unlocks one graphic for unlimited SVG and PNG downloads.</p>
<a href="${site}"><img src="${site}/og.png" alt="Instagraphic — turn your text into a professional graphic in seconds" width="600" style="width:100%;max-width:600px;border:1px solid #dee2e6;border-radius:8px"/></a>
</div>`,
  });
}

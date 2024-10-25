import { sendMail } from "@/lib/nodemailer";
import { getResetPasswordEmailHtml, resetEmail, verifyEmail } from "@/emails";

export async function passwordResetMail(
  email: string,
  userFirstname: string,
  resetPasswordLink: string
) {
  const html = await getResetPasswordEmailHtml(
    userFirstname,
    resetPasswordLink
  );
  await sendMail(email, "SvS Passwort Zurücksetzen", "", html);
}

export async function sendVerificationEmail(email: string, token: string) {
  const html = await verifyEmail(token);
  await sendMail(email, "SvS Passwort Zurücksetzen", "", html).catch((e) => {
    console.log(e);
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const html = await resetEmail(token);
  await sendMail(email, "SvS Passwort Zurücksetzen", "", html);
}

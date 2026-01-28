import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to,
      subject,
      html,
    });

    console.log("[EMAIL SENT]", to);
    return data;
  } catch (error) {
    console.error("[EMAIL ERROR]", error);
    throw error;
  }
};

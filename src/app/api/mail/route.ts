import VerificationEmail from "../../../../emails/VerificationEmail";
import { resend } from "@/lib/resend";

export async function POST(request: Request) {
  const { username, otp, email } = await request.json();
  try {
    const data = await resend.emails.send({
      from: "Mystery Message <onboarding@resend.dev>",
      to: email ? [email] : ["user@example.com"],
      subject: "Verification Code | Mystery Message",
      react: VerificationEmail({ username, otp }),
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Error while sending email", error);
    return Response.json({ success: false, error }, { status: 500 });
  }
}

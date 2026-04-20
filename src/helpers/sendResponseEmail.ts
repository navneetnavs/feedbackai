import { resend } from "@/lib/resend";
import ResponseEmail from "../../emails/ResponseEmail";

export async function sendResponseEmail(
  response: string,
  username: string,
  email: string
) {
  try {
    await resend.emails.send({
      from: "Mystery Message <onboarding@resend.dev>",
      to: [email],
      subject: `Reply from ${username} | Mystery Message`,
      react: ResponseEmail({ response, username }),
    });

    return {
      success: true,
      message: "Reply email sent successfully",
    };
  } catch (error) {
    console.error("Error while sending reply email", error);
    return {
      success: false,
      message: "Error while sending reply email",
    };
  }
}

import { render } from "@react-email/render";
import ResetPasswordEmail from "@/emails/resetpassword";
import LinkEmail from "./verify-email";
import ResetPassword from "./reset-email";

export async function getResetPasswordEmailHtml(
  userFirstname: string,
  resetPasswordLink: string
) {
  return await render(
    <ResetPasswordEmail
      userFirstname={userFirstname}
      resetPasswordLink={resetPasswordLink}
    />,
    {
      pretty: true,
    }
  );
}

export async function verifyEmail(token: string) {
  return await render(<LinkEmail token={token} />, {
    pretty: true,
  });
}

export async function resetEmail(token: string) {
  return await render(<ResetPassword token={token} />, {
    pretty: true,
  });
}

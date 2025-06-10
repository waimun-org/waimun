import { env } from "@/lib/env";

export async function verifyHCaptchaToken(token: string): Promise<boolean> {
  const response = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret: env.HCAPTCHA_SECRET_KEY,
      response: token,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to verify hCaptcha token");
  }

  const data = (await response.json()) as { success: boolean };
  return Boolean(data.success);
}

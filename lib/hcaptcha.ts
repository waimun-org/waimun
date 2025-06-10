export async function verifyHCaptchaToken(token: string): Promise<boolean> {
  const { HCAPTCHA_SECRET_KEY } = process.env;

  if (!HCAPTCHA_SECRET_KEY) {
    throw new Error("HCAPTCHA_SECRET_KEY environment variable is not set");
  }

  const response = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret: HCAPTCHA_SECRET_KEY,
      response: token,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to verify hCaptcha token");
  }

  const data = (await response.json()) as { success: boolean };
  return Boolean(data.success);
}

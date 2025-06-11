import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { render } from "@react-email/components";
import React from "react";
import BankTransferEmail, {
  type BankTransferEmailProps,
} from "@/emails/bank-transfer-email";
import PaymentConfirmationEmail, {
  type PaymentConfirmationEmailProps,
} from "@/emails/payment-confirmation-email";
import { env } from "@/lib/env";

const sesClient = new SESClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

type EmailData = {
  to: string;
  subject: string;
  component: React.ReactElement;
};

async function sendEmail({ to, subject, component }: EmailData) {
  const htmlBody = await render(component);
  const textBody = await render(component, { plainText: true });

  const sendEmailCommand = new SendEmailCommand({
    Source: env.AWS_SES_SENDER_EMAIL,
    Destination: {
      ToAddresses: [to],
    },
    ReplyToAddresses: [env.AWS_SES_REPLY_TO_EMAIL],
    Message: {
      Subject: {
        Data: subject,
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: htmlBody,
          Charset: "UTF-8",
        },
        Text: {
          Data: textBody,
          Charset: "UTF-8",
        },
      },
    },
  });

  return await sesClient.send(sendEmailCommand);
}

type BankTransferEmailData = BankTransferEmailProps & {
  to: string;
};

type PaymentConfirmationEmailData = PaymentConfirmationEmailProps & {
  to: string;
};

export async function sendBankTransferEmail({
  to,
  ...data
}: BankTransferEmailData) {
  return sendEmail({
    to,
    subject: "Complete Your Payment",
    component: <BankTransferEmail {...data} />,
  });
}

export async function sendPaymentConfirmationEmail({
  to,
  ...data
}: PaymentConfirmationEmailData) {
  return sendEmail({
    to,
    subject: "Payment Confirmation",
    component: <PaymentConfirmationEmail {...data} />,
  });
}

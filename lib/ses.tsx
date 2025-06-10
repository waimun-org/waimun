import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { render } from "@react-email/components";
import React from "react";
import BankTransferEmail, {
  type BankTransferEmailProps,
} from "@/emails/bank-transfer-email";
import { env } from "@/lib/env";

const sesClient = new SESClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

type BankTransferEmailData = BankTransferEmailProps & {
  to: string;
};

export async function sendBankTransferEmail({
  to,
  ...data
}: BankTransferEmailData) {
  const email = <BankTransferEmail {...data} />;
  const htmlBody = await render(email);
  const textBody = await render(email, { plainText: true });

  const sendEmailCommand = new SendEmailCommand({
    Source: env.AWS_SES_SENDER_EMAIL,
    Destination: {
      ToAddresses: [to],
    },
    ReplyToAddresses: [env.AWS_SES_REPLY_TO_EMAIL],
    Message: {
      Subject: {
        Data: "Complete Your Payment",
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

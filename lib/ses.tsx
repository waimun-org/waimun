import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { render } from "@react-email/components";
import React from "react";
import BankTransferEmail, {
  type BankTransferEmailProps,
} from "@/emails/bank-transfer-email";

const {
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_SES_FROM_EMAIL,
} = process.env;

if (
  !AWS_REGION ||
  !AWS_ACCESS_KEY_ID ||
  !AWS_SECRET_ACCESS_KEY ||
  !AWS_SES_FROM_EMAIL
) {
  throw new Error("Missing required environment variables for SES");
}

const sesClient = new SESClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

type BankTransferEmailData = BankTransferEmailProps & {
  to: string;
};

export async function sendBankTransferEmail(data: BankTransferEmailData) {
  const email = <BankTransferEmail {...data} />;
  const htmlBody = await render(email);
  const textBody = await render(email, { plainText: true });

  const sendEmailCommand = new SendEmailCommand({
    Source: AWS_SES_FROM_EMAIL,
    Destination: {
      ToAddresses: [data.to],
    },
    Message: {
      Subject: {
        Data: "Complete your form submission payment",
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

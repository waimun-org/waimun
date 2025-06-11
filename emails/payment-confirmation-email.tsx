import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
  Text,
  Img,
} from "@react-email/components";
import * as React from "react";

export interface PaymentConfirmationEmailProps {
  fullName?: string;
  amount: string;
  paymentDate: string;
  paymentMethod: string;
  transactionId: string;
}

export const PaymentConfirmationEmail = ({
  fullName,
  amount,
  paymentDate,
  paymentMethod,
  transactionId,
}: PaymentConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your payment has been successfully processed</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto w-full max-w-[600px] p-8">
            <Img
              src="https://cdn.sanity.io/images/qs4butxl/production/0deb901f492621309f640cb22dca833424998c20-8380x2134.svg?h=80&q=75&fit=clip&auto=format&fm=png"
              alt="WaiMUN"
              className="mx-auto mb-8 h-[40px]"
            />

            <Text className="mb-8 text-base leading-relaxed text-neutral-700">
              Kia ora{fullName ? ` ${fullName}` : ""},
            </Text>

            <Text className="mb-8 text-base leading-relaxed text-neutral-700">
              Great news! Your payment has been successfully processed and your
              submission is now complete.
            </Text>

            <Heading className="mt-16 mb-8 text-center text-base leading-relaxed text-neutral-700">
              Payment Confirmation ✅
            </Heading>

            <Text className="mb-8 text-base leading-relaxed text-neutral-700">
              Here are the details of your successful payment:
            </Text>

            <div className="mb-8 rounded-lg bg-neutral-50 p-6">
              <Text className="my-2 text-base leading-relaxed text-neutral-700">
                <span className="font-bold">Amount Paid:</span>{" "}
                <span className="font-mono">{amount}</span>
              </Text>

              <Text className="my-2 text-base leading-relaxed text-neutral-700">
                <span className="font-bold">Payment Date:</span>{" "}
                <span className="font-mono">{paymentDate}</span>
              </Text>

              <Text className="my-2 text-base leading-relaxed text-neutral-700">
                <span className="font-bold">Payment Method:</span>{" "}
                <span className="font-mono">{paymentMethod}</span>
              </Text>

              <Text className="my-2 text-base leading-relaxed text-neutral-700">
                <span className="font-bold">Transaction ID:</span>{" "}
                <span className="font-mono">{transactionId}</span>
              </Text>
            </div>

            <Heading className="mt-16 mb-8 text-center text-base leading-relaxed text-neutral-700">
              Keep This Email 💾
            </Heading>

            <Text className="text-base leading-relaxed text-neutral-700">
              Please keep this email as proof of your payment. The transaction
              ID{" "}
              <span className="rounded bg-neutral-100 px-2 py-1 font-mono text-sm font-medium">
                {transactionId}
              </span>{" "}
              can be used for reference if you need to contact us about your
              payment.
            </Text>

            <Heading className="mt-16 mb-8 text-center text-base leading-relaxed text-neutral-700">
              Need Help? 🤝
            </Heading>

            <Text className="text-base leading-relaxed text-neutral-700">
              If you have any questions about your payment or submission, please
              don&apos;t hesitate to contact us by replying to this email.
            </Text>

            <Text className="mb-8 text-base leading-relaxed text-neutral-700">
              Thank you for your payment and participation!
            </Text>

            <Text className="mt-8 text-base leading-relaxed text-neutral-700">
              Ngā mihi nui,
              <br />
              WaiMUN
            </Text>

            <Hr />

            <Text className="text-sm leading-relaxed text-neutral-500">
              This is an automated message from WaiMUN. Please do not reply to
              this email unless you need assistance.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

PaymentConfirmationEmail.PreviewProps = {
  fullName: "James Blair",
  amount: "$25.00",
  paymentDate: "11 June 2025",
  paymentMethod: "Card",
  transactionId: "pi_3OqIC92eZvKYlo2C1234567890",
} as PaymentConfirmationEmailProps;

export default PaymentConfirmationEmail;
